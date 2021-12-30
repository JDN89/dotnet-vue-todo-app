using Npgsql;
using Carter;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

var connectionString = "User ID=jan; Password=9450; Host=localhost; Port=5432; Database=tododb; Pooling=true;";

builder.Services.AddScoped(_ => new NpgsqlConnection(connectionString));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(x =>
{
    x.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the bearer scheme",
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
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();
builder.Services.AddAuthorization(o => o.AddPolicy("AdminsOnly",
                                  b => b.RequireClaim("admin", "true")));
var app = builder.Build();


await EnsureDb(app.Services, app.Logger);


if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");

}
if (app.Environment.IsDevelopment())
{
    // PLAATS HIER JE CORS SETTINGS
    app.UseDeveloperExceptionPage();
    app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());


}

//routing and endpoints not necessary


// app.UseSpaStaticFiles();

app.MapGet("/error", () => Results.Problem("An error occurred.", statusCode: 500))
   .ExcludeFromDescription();

app.MapSwagger();
app.UseSwaggerUI();

app.UseAuthentication();
app.UseAuthorization();

app.MapCarter();
// app.UseHttpLogging();



//  app.Use(async (context, next) =>
//     {
//         await next();
//         if (context.Response.StatusCode == 404)
//         {
//             context.Request.Path = "/Home";
//             await next();
//         }
//     });

// app.UseSpa(builder =>
// {
//     if (app.Environment.IsDevelopment())
//     {
//         builder.UseProxyToSpaDevelopmentServer("http://localhost:4000/");
//     }

// });


app.Run();


async Task EnsureDb(IServiceProvider services, ILogger logger)
{
    logger.LogInformation("Ensuring database exists at connection string '{connectionString}'", connectionString);

    await using var db = services.CreateScope().ServiceProvider.GetRequiredService<NpgsqlConnection>();

}

