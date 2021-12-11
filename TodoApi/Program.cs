using Dapper;
using Npgsql;
using System.ComponentModel.DataAnnotations;


var builder = WebApplication.CreateBuilder(args);

var connectionString = "User ID=jan; Password=9450; Host=localhost; Port=5432; Database=postgres; Pooling=true;";

builder.Services.AddScoped(_ => new NpgsqlConnection(connectionString));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
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




app.MapGet("/", () => "Hello World!");

app.MapGet("/hello", async (NpgsqlConnection db) =>
    await db.QueryAsync<Message>("SELECT * FROM public.message_board"))
   .WithName("GetAllMessages");

app.Run();


async Task EnsureDb(IServiceProvider services, ILogger logger)
{
    logger.LogInformation("Ensuring database exists at connection string '{connectionString}'", connectionString);

    await using var db = services.CreateScope().ServiceProvider.GetRequiredService<NpgsqlConnection>();

}

public class Message
{
    public int Id { get; set; }
    [Required]
    public string? Title { get; set; }
    public string? Body { get; set; }
}