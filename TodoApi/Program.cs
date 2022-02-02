using Npgsql;
using Carter;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using TodoApi.modules.UserModule.Services;
using System.Text;
using Dapper;
using Microsoft.IdentityModel.Tokens;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped(_ =>
{
    var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

    string connStr;

    // Depending on if in development or production, use either Heroku-provided
    // connection string, or development connection string from env var.
    if (env == "Development")
    {
        // Use connection string from file.
        connStr = builder.Configuration.GetConnectionString("DefaultConnection");
    }
    else
    {
        // Use connection string provided at runtime by Heroku.
        var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

        // Parse connection URL to connection string for Npgsql
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
    }

    // Whether the connection string came from the local development configuration file
    // or from the environment variable from Heroku, use it to set up your DbContext.
    return new NpgsqlConnection(connStr);
});

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

builder.Services.AddCarter();
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
builder.Services.AddSingleton<IEncryptionService, EncryptionService>();
builder.Services.AddSingleton<IUserService, UserService>();
builder.Services.AddSingleton<ITokenService, TokenService>();

var app = builder.Build();


await EnsureDb(app.Services, app.Logger);

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
    .ImageSources(s => s.Self().CustomSources("iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFI0lEQVRYR8VXWUiVWxT+nK6piClOaYqQWFxRUUEh6UF8ECFJRVEcMHypwAmVrBwylUYHCCN6UHCesAfFRARRQVOjLAPBAY1QsjL0OOd0b9+G//ccjnpO6eUuOHiO/7/X+va31l7r2zr//DL8j6ZzEgC4Bx0dnT/axm8BYKCtrS3x0dXVxd7eHra3t8V3YyNjGPxlIIPQFpBWABhobW0Nq6ur6O3txdTUFL58+QKFQoGdnR2cOnUKZmZm8PL0gruHOy5cuAAjIyOtGNEIYGNjA9XV1RgcHMSrV6/w9evXIx0z8KVLl3D//n24u7vDwGCflYMWHgiAVO/u7mJiYgKxsbEYGRnRajfKL5mYmCAlJQVpaWkwNzcXafotAN3d3YiOjsa3b9/U1unp6cHNzQ02NjaiDvhZWVnB6OgoNjc35fdPnz6Ny5cvIz8/H...8/BsH0MpXMOfuKr6+vON76+vqqAKT+7e3tjU+fPsksUExwPB82zzXxT33AgHFxcXB1dRVKKTg4WF6mMo53tnfQ1NwkBhIZkczFxQUvXrwQtEmjWNvewKFEiUY2fXx8xGzgTJBMTQ+wYu/evYunT5+qFCS1Xnp6uujlHK2ygyPkOFnljh8+fCh6DIeQl5eXCmlqiojHZGFhQTQOigoWkLKRDY5Vfg5Tvgy8sb6BmtoacfQyMzNFgbv+7QodXdX7w6GilGOYCuj169dCkisb6YyKihI7Y1XTpMsJ/1K2s4tywLGds6lxpB+kpA6V5XREkfny5UtxFJX1IfPPcVpTUyM3L4oY9pJnz54Jbch8Uz96eHgcKWaOvBcQBKuYwZuamoSk4lHi/0krJTfHNYWHxBQLjgOHlxWapmLVeDGR7q6sjfn5eVHBpFIWFL/YUL7fSgG1vS9qBKCce22davueYEjShJoayn/1/F/PdvW/9LzXsQAAAABJRU5ErkJggg=="))
    .ScriptSources(s => s.Self().CustomSources("sha256-LMTRYXeCnUKKf767smVL/pXEsnE5au870Way+lsZuvQ="))
);

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();

    app.UseDefaultFiles();
    app.UseSpaStaticFiles();

    // app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
    app.MapSwagger();
    app.UseStaticFiles();
}
else
{
    app.UseExceptionHandler("/error");
    app.Use(async(context,next) =>
    {
        context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
        await next.Invoke();
    });
}






//routing and endpoints not necessary

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/error", () => Results.Problem("An error occurred.", statusCode: 500))
    .ExcludeFromDescription();

app.UseAuthentication();
app.UseAuthorization();

// useHttpLogging to log your endpoints

app.MapCarter();

app.Run();


async Task EnsureDb(IServiceProvider services, ILogger logger)
{
    logger.LogInformation("Ensuring database exists at connection string '{ConnectionString}'",
        builder.Configuration.GetConnectionString("DefaultConnection"));


    await using var db = services.CreateScope().ServiceProvider.GetRequiredService<NpgsqlConnection>();

    var sql = $@"CREATE TABLE IF NOT EXISTS messages (
	id serial4 NOT NULL,
	title text NOT NULL,
	body text NOT NULL,
	CONSTRAINT message_board_pk PRIMARY KEY (id)
);";
    var sql1 = $@"CREATE TABLE IF NOT EXISTS users (
              id serial4 NOT NULL,
    email text NOT NULL,
    hash text NOT NULL,
    CONSTRAINT users_pk PRIMARY KEY (id)
                 );";

    var sql2 = $@"CREATE TABLE IF NOT EXISTS todo_lists (
	id serial4 NOT NULL,
	user_id serial4 NOT NULL,
	title text NOT NULL,
	CONSTRAINT todo_lists_pk PRIMARY KEY (id),
	CONSTRAINT todo_lists_fk FOREIGN KEY (user_id) REFERENCES users(id)
);";

    
    var sql3 = $@"CREATE TABLE IF NOT EXISTS todos (
	id serial4 NOT NULL,
	list_id int4 NOT NULL,
	todo text NOT NULL,
	CONSTRAINT todos_pk PRIMARY KEY (id),
	CONSTRAINT todos_fk FOREIGN KEY (list_id) REFERENCES todo_lists(id) ON DELETE CASCADE
);"; 

    
    var sql4 = $@"CREATE TABLE IF NOT EXISTS archived_todos (
	id serial4 NOT NULL,
	list_id int4 NOT NULL,
	archived text NOT NULL,
	CONSTRAINT archived_todos_pk PRIMARY KEY (id),
	CONSTRAINT archived_todos_fk FOREIGN KEY (list_id) REFERENCES todo_lists(id) ON DELETE CASCADE
);"; 


    await db.ExecuteAsync(sql);
    await db.ExecuteAsync(sql1);
    await db.ExecuteAsync(sql2);
    await db.ExecuteAsync(sql3);
    await db.ExecuteAsync(sql4);
}