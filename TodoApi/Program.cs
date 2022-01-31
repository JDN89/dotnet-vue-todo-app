using Npgsql;
using Carter;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using TodoApi.modules.UserModule.Services;
using System.Text;
using Microsoft.IdentityModel.Tokens;



var builder = WebApplication.CreateBuilder(args);

var connectionString = "User ID=jan; Password=9450; Host=localhost; Port=5432; Database=tododb; Pooling=true;";

builder.Services.AddScoped(_ => new NpgsqlConnection(connectionString));

builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSpaStaticFiles(config => {
//     config.RootPath="dist";
// });
builder.Services.AddHttpContextAccessor();
builder.Services.AddSwaggerGen(x =>
//add authorize to swagger and show which routes are authorized
{
    x.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        // in the authorzation lock > Bearer token
        //so write Bearer and paste token
        //above took me long time to figure out > REMEMBER for next project
        Description = "JWT Authorization header using the bearer scheme  ",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });
    x.AddSecurityRequirement(new OpenApiSecurityRequirement{
    {
    new OpenApiSecurityScheme{Reference = new OpenApiReference {
        Id = "Bearer",
        Type = ReferenceType.SecurityScheme
    }}, new List<string>()
}
});

}
);

builder.Services.AddCors();

builder.Services.AddCarter();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(builder.Configuration.GetSection("Jwt:Token").Value)),
            ValidateLifetime = true,
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("UsersOnly", policy => policy.RequireClaim("user", "registered"));
});

// Inject Services as DI in your Api endpoints or services
builder.Services.AddSingleton<IEncryptionService, EncryptionService>();
builder.Services.AddSingleton<IUserService, UserService>();
builder.Services.AddSingleton<ITokenService, TokenService>();

var app = builder.Build();


await EnsureDb(app.Services, app.Logger);


if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");

}
if (app.Environment.IsDevelopment())
{
    // launch client app as npm run dev!!
    // app.UseSpa(builder =>
    // {
    //     if (app.Environment.IsDevelopment())
    //         builder.UseProxyToSpaDevelopmentServer("http://localhost:3333/");
    // });
    // PLAATS HIER JE CORS SETTINGS
    app.UseDeveloperExceptionPage();
    app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
    app.MapSwagger();
    app.UseSwaggerUI();


}

//routing and endpoints not necessary


// app.UseSpaStaticFiles();


app.MapGet("/error", () => Results.Problem("An error occurred.", statusCode: 500))
   .ExcludeFromDescription();

// app.UseSpaStaticFiles();

app.UseAuthentication();
app.UseAuthorization();
app.UseHttpsRedirection();
// useHttpLogging to log your endpoints
app.UseHttpLogging();

app.MapCarter();



app.Run();


async Task EnsureDb(IServiceProvider services, ILogger logger)
{
    logger.LogInformation("Ensuring database exists at connection string '{connectionString}'", connectionString);

    await using var db = services.CreateScope().ServiceProvider.GetRequiredService<NpgsqlConnection>();

}

