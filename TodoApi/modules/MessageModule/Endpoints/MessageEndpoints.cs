using Dapper;
using Npgsql;
using TodoApi.modules.MessageModule.Endpoints.Internal;
using TodoApi.modules.MessageModule.models;

namespace TodoApi.modules.MessageModule.Endpoints;

public class MessageEndpoints : IEndpoints
{
     
    private const string ContentType = "application/json";
    private const string Tag = "Messages";
    private const string BaseRoute = "api";

    public static void DefineEndpoints(IEndpointRouteBuilder app)
    {
        app.MapPost(BaseRoute, CreateMessageAsync)
            .WithName("CreateMessage")
            .Accepts<NewMessage>(ContentType)
            .Produces<Message>(201)
            .WithTags(Tag);
       

        app.MapGet("api/", GetAllMessagesAsync)
            .WithName("GetMessages")
            .Produces<IEnumerable<Message>>(200)
            .WithTags(Tag);
/*
        app.MapGet($"{BaseRoute}/{{isbn}}", GetBookByIsbnAsync)
            .WithName("GetBook")
            .Produces<Book>(200).Produces(404)
            .WithTags(Tag);

        app.MapPut($"{BaseRoute}/{{isbn}}", UpdateBookAsync)
            .WithName("UpdateBook")
            .Accepts<Book>(ContentType)
            .Produces<Book>(200).Produces<IEnumerable<ValidationFailure>>(400)
            .WithTags(Tag);

        app.MapDelete($"{BaseRoute}/{{isbn}}", DeleteBookAsync)
            .WithName("DeleteBook")
            .Produces(204).Produces(404)
            .WithTags(Tag);
            */
    }
    
    internal static async Task<IResult> CreateMessageAsync(
        NewMessage message,  NpgsqlConnection db)
    {

        var createdMessage = await db.QuerySingleAsync<Message>(
            "INSERT INTO messages (title, body) VALUES (@Title, @Body) RETURNING * ", message);

        return Results.Created(BaseRoute, createdMessage);
        
    }
    internal static async Task<IResult> GetAllMessagesAsync(
        NpgsqlConnection db)
    {
        Console.WriteLine("fire");

    var messages = await db.QueryAsync<Message>("SELECT * FROM messages");
    return Results.Ok(messages);
    }
// insert Services to which you offload extra logic here
    public static  void AddServices(IServiceCollection services, IConfiguration configuration)
    {
       
        // services.AddSingleton<IMessageService, MessageService>();
    } 
}

/*

j
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("api/", GetMessages).AllowAnonymous();
        app.MapPost("api/", CreateMessage).AllowAnonymous();
        app.MapDelete("api/", DeleteMessage).AllowAnonymous();
        app.MapPut("api/", UpdateMessage).AllowAnonymous();

    }

    private async Task<IEnumerable<Message>> GetMessages(NpgsqlConnection db) =>
     await db.QueryAsync<Message>("SELECT * FROM messages");

    // make sure that you use the correct model property names
    private static async Task<IResult> CreateMessage(NewMessage newMessage, NpgsqlConnection db)
    {

        var createdMessage = await db.QuerySingleAsync<Message>(
            "INSERT INTO messages (title, body) VALUES (@Title, @Body) RETURNING * ", newMessage);

        return Results.Created("/", createdMessage);

    }


    private static async Task<IResult> UpdateMessage(Message updatedMessage, NpgsqlConnection db)
    {
        var newMessage = await db.QuerySingleAsync<Message>(
            "UPDATE messages SET title = @Title, body = @Body WHERE id = @Id RETURNING *", updatedMessage);

        return Results.Created("/", newMessage);
    }

    // on successful deletion status code 204 -> no content
    private static async Task<IResult> DeleteMessage(int id, NpgsqlConnection db) =>
        await db.ExecuteAsync(
            "DELETE FROM messages WHERE id = @id", new { id }) == 1
            ? Results.NoContent()
            : Results.NotFound();
}

*/