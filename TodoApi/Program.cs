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
//add authorize to swagger and show which routes are authorized
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


if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");
}

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();

    app.UseDefaultFiles();
    app.UseSpaStaticFiles();

    // app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
    app.MapSwagger();
    app.UseStaticFiles();
}

//routing and endpoints not necessary


app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/error", () => Results.Problem("An error occurred.", statusCode: 500))
    .ExcludeFromDescription();


// app.UseSpaStaticFiles();

app.UseAuthentication();
app.UseAuthorization();
//app.UseHttpsRedirection();
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

    /*
    var sql3 = $@"CREATE TABLE IF NOT EXISTS todos (
	id serial4 NOT NULL,
	list_id int4 NOT NULL DEFAULT,
	todo text NOT NULL,
	CONSTRAINT todos_pk PRIMARY KEY (id),
	CONSTRAINT todos_fk FOREIGN KEY (list_id) REFERENCES todo_lists(id) ON DELETE CASCADE
);"; */

    /*
    var sql4 = $@"CREATE TABLE IF NOT EXISTS archived_todos (
	id serial4 NOT NULL,
	list_id int4 NOT NULL DEFAULT,
	archived text NOT NULL,
	CONSTRAINT archived_todos_pk PRIMARY KEY (id),
	CONSTRAINT archived_todos_fk FOREIGN KEY (list_id) REFERENCES todo_lists(id) ON DELETE CASCADE
);"; */


    await db.ExecuteAsync(sql);
    await db.ExecuteAsync(sql1);
    await db.ExecuteAsync(sql2);
    //await db.ExecuteAsync(sql3);
   // await db.ExecuteAsync(sql4);
}