using Npgsql;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Dapper;
using FluentValidation;
using Microsoft.IdentityModel.Tokens;
using TodoApi.Data;
using TodoApi.Endpoints.Internal;
using TodoApi.Services;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSpaStaticFiles(config => { config.RootPath = "dist"; });
builder.Services.AddHttpContextAccessor();
builder.Services.AddSwaggerGen(x =>
//add authorize to swagger and show which routes need authorization
    {
        x.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            // in the authorization lock > Bearer token
            //so write Bearer and paste token
            //above took me long time to figure out > REMEMBER for next project
            Description = "JWT Authorization header using the bearer scheme  ",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey
        });
        x.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Id = "Bearer",
                        Type = ReferenceType.SecurityScheme
                    }
                },
                new List<string>()
            }
        });
    }
);

builder.Services.AddCors();

builder.Services.AddEndpoints<Program>(builder.Configuration);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(builder.Configuration.GetSection("TokenKey").Value)),
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
builder.Services.AddValidatorsFromAssemblyContaining<Program>();
builder.Services.AddSingleton<IDbConnectionFactory>(_ =>
    {
        var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

        // string connStr;
        string connStr;

        // to  run test comment out this part unitll 
        
        if (env == "Development")
        {
            connStr = builder.Configuration.GetConnectionString("DefaultConnection");
            return new PostgresConnectionFactory(connStr);
        }
 
        var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
        if (connUrl is null)
        {
            throw new Exception("connurl is null");
        }

        connUrl = connUrl.Replace("postgres://", string.Empty);
        var pgUserPass = connUrl.Split("@")[0];
        var pgHostPortDb = connUrl.Split("@")[1];
        var pgHostPort = pgHostPortDb.Split("/")[0];
        var pgDb = pgHostPortDb.Split("/")[1];
        var pgUser = pgUserPass.Split(":")[0];
        var pgPass = pgUserPass.Split(":")[1];
        var pgHost = pgHostPort.Split(":")[0];
        var pgPort = pgHostPort.Split(":")[1];

        connStr =
            $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb}; SSL Mode=Require; Trust Server Certificate=true";
        return new PostgresConnectionFactory(connStr);
    }


);

builder.Services.AddSingleton<DbInitializer>();
builder.Services.AddSingleton<IMessageService, MessageService>();
var app = builder.Build();


EnsureDb(app.Services, app.Logger);

app.UseXContentTypeOptions();
app.UseReferrerPolicy(opt => opt.NoReferrer());
app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
app.UseXfo(opt => opt.Deny());
app.UseCsp(opt => opt
    .BlockAllMixedContent()
    .StyleSources(s => s.Self())
    .FontSources(s => s.Self())
    .FormActions(s => s.Self())
    .FrameAncestors(s => s.Self())
    //.ImageSources(s => s.Self())
    .ScriptSources(s => s.Self().CustomSources("sha256-LMTRYXeCnUKKf767smVL/pXEsnE5au870Way+lsZuvQ="))
);



if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();


    // app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
    app.UseSwagger();
}
else
{
    app.UseExceptionHandler("/error");
    app.Use(async (context, next) =>
    {
        context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
        await next.Invoke();
    });
}


//routing and endpoints not necessary

app.UseDefaultFiles();
app.UseStaticFiles();

        app.UseSpaStaticFiles();
app.MapGet("/error", () => Results.Problem("An error occurred.", statusCode: 500))
    .ExcludeFromDescription();

app.UseAuthentication();
app.UseAuthorization();

// useHttpLogging to log your endpoints

app.UseEndpoints<Program>();
  var databaseInitializer = app.Services.GetRequiredService<DbInitializer>();
    await databaseInitializer.InitializeAsync();
app.Run();


 void EnsureDb(IServiceProvider services, ILogger logger)
{
    logger.LogInformation("Ensuring database exists at connection string '{ConnectionString}'",
        builder.Configuration.GetConnectionString("DefaultConnection"));
    
  

}
// Make the implicit Program class public so test projects can access it
public partial class Program { }