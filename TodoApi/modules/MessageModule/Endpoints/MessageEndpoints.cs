using Dapper;
using Microsoft.AspNetCore.Authorization;
using Npgsql;
using TodoApi.modules.MessageModule.Endpoints.Internal;
using TodoApi.modules.MessageModule.models;

namespace TodoApi.modules.MessageModule.Endpoints;

public class MessageEndpoints : IEndpoints
{
    private const string ContentType = "application/json";
    private const string Tag = "Messages";

    public static void DefineEndpoints(IEndpointRouteBuilder app)
    {
        app.MapPost("api/", CreateMessageAsync)
            .WithName("CreateMessage")
            .Accepts<NewMessage>(ContentType)
            .Produces<Message>(201)
            .WithTags(Tag)
            .AllowAnonymous();


        app.MapGet("api/", GetAllMessagesAsync)
            .WithName("GetMessages")
            .Produces<IEnumerable<Message>>(200)
            .WithTags(Tag)
            .AllowAnonymous();

        app.MapPut("api/", UpdateMessage)
            .WithName("UpdateMessage")
            .Produces<Message>(201)
            .WithTags(Tag)
            .AllowAnonymous();

        app.MapDelete("api/", DeleteMessage)
            .WithName("DeleteMessage")
            .Produces(204).Produces(404)
            .WithTags(Tag)
            .AllowAnonymous();
    }

    internal static async Task<IResult> CreateMessageAsync(
        NewMessage message, NpgsqlConnection db)
    {
        var createdMessage = await db.QuerySingleAsync<Message>(
            "INSERT INTO messages (title, body) VALUES (@Title, @Body) RETURNING * ", message);

        return Results.Created("api/", createdMessage);
    }

    internal static async Task<IResult> GetAllMessagesAsync(
        NpgsqlConnection db)
    {
        Console.WriteLine("fire");

        var messages = await db.QueryAsync<Message>("SELECT * FROM messages");
        return Results.Ok(messages);
    }


    internal static async Task<IResult> UpdateMessage(Message updateMessage,
        NpgsqlConnection db)
    {
        var updated = await db.QuerySingleAsync<Message>(
            "UPDATE messages SET title = @Title, body = @Body WHERE id = @Id RETURNING *", updateMessage);

        return Results.Created("api/", updated);
    }


    internal static async Task<IResult> DeleteMessage(int id,
        NpgsqlConnection db)
    {
        var deleted = await db.ExecuteAsync(
            "DELETE FROM messages WHERE id = @id", new {id}) == 1;
        return deleted
            ? Results.NoContent()
            : Results.NotFound();
    }

// ======================================    
// insert Services to which you offload extra logic here
// ===========================================
    public static void AddServices(IServiceCollection services, IConfiguration configuration)
    {
        // services.AddSingleton<IMessageService, MessageService>();
    }
}