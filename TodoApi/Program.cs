using Dapper;
using Npgsql;
using System.ComponentModel.DataAnnotations;
using Carter;


var builder = WebApplication.CreateBuilder(args);

var connectionString = "User ID=jan; Password=9450; Host=localhost; Port=5432; Database=tododb; Pooling=true;";

builder.Services.AddScoped(_ => new NpgsqlConnection(connectionString));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:4000/");
    });
});

builder.Services.AddCarter();

var app = builder.Build();


await EnsureDb(app.Services, app.Logger);


if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");
}

app.MapGet("/error", () => Results.Problem("An error occurred.", statusCode: 500))
   .ExcludeFromDescription();

app.MapSwagger();
app.UseSwaggerUI();
app.UseCors("CorsPolicy");
app.MapCarter();



app.Run();


async Task EnsureDb(IServiceProvider services, ILogger logger)
{
    logger.LogInformation("Ensuring database exists at connection string '{connectionString}'", connectionString);

    await using var db = services.CreateScope().ServiceProvider.GetRequiredService<NpgsqlConnection>();

}

