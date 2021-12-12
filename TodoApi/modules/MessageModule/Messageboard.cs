namespace MessageBoard;


using Dapper;
using Npgsql;
using Carter;
using Microsoft.AspNetCore.Mvc;
using TodoApi.modules.MessageModule.models;

//Carter: Modules are registered based on assemblies scanning and added to DI automatically
public class MessageModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/", GetMessages);
        app.MapPost("/", CreateMessage);
        app.MapDelete("/", DeleteMessage);
        app.MapPut("/", UpdateMessage);


    }

    private async Task<IEnumerable<Message>> GetMessages(NpgsqlConnection db) =>
        await db.QueryAsync<Message>("SELECT * FROM public.messages");

    // make sure that you use the correct model property names
    private static async Task<IResult> CreateMessage(Message createdmessage, NpgsqlConnection db)
    {
        var newMessage = await db.QuerySingleAsync<Message>(
            "INSERT INTO public.messages (title, body) VALUES (@Title, @Body) RETURNING * ", createdmessage);

        return Results.Created("/", newMessage);

        // underlying returns a  dynamic route with the id of the created message
        // in my case I don't need created because my / isn't a dynamic route??
        // return Results.Created($"/{newMessage.Id}", newMessage);
        // the Results.Ok doesn't take a Url
        // return Results.Ok( newMessage);
    }


    private static async Task<IResult> UpdateMessage(Message updatedMessage, NpgsqlConnection db)
    {
        var newMessage = await db.QuerySingleAsync<Message>(
            "UPDATE public.messages SET title = @Title, body = @Body WHERE id = @Id RETURNING *", updatedMessage);

        return Results.Created("/", newMessage);
    }

    // on successfull deletion status code 204 -> no content
    private static async Task<IResult> DeleteMessage(int id, NpgsqlConnection db) =>
        await db.ExecuteAsync(
            "DELETE FROM public.messages WHERE id = @id", new { id }) == 1
            ? Results.NoContent()
            : Results.NotFound();
}


///=================================================================

// routing explenation for later reference: dynamix route
// this is a dynamic route
// test in postman : https://localhost:7126/1
// replace 1 with the ID value you want to retrieve

// app.MapGet("/{id}", GetMessage);
//
//  private async Task<Message> GetMessage(int id, NpgsqlConnection db) =>
// await db.QuerySingleOrDefaultAsync<Message>("SELECT * FROM public.messages WHERE id = @id", new { id });

// REGULAR ROUTE WITH QUERY PARAM
// without {} this is a regular route and Id is a query param;
// test in postman => https://localhost:7126/?id=1
// key: id value : 1