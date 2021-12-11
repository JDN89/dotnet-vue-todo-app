namespace MessageBoard;


using Dapper;
using Npgsql;
using Carter;
using Microsoft.AspNetCore.Mvc;
using TodoApi.modules.MessageModule.models;

public class MessageModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        // app.MapGet("/", GetMessages);
        app.MapGet("/{id}", GetMessage);



    }
    // private async Task<IEnumerable<Message>> GetMessages(NpgsqlConnection db) =>
    //     await db.QueryAsync<Message>("SELECT * FROM public.message_board");
    private async Task<Message> GetMessage(int id, NpgsqlConnection db) =>
        await db.QuerySingleOrDefaultAsync<Message>("SELECT * FROM public.messages WHERE id = @id", new { id });

}


//    private static async Task<IResult> GetTodo(int id, SqliteConnection db) =>
//         await db.QuerySingleOrDefaultAsync<Todo>(
//             "SELECT * FROM Todos WHERE Id = @id", new { id })
//             is Todo todo
//                 ? Results.Ok(todo)
//                 : Results.NotFound();


//         app.MapGet("/", () => "Hello World!");

// app.MapGet("/hello", async (NpgsqlConnection db) =>
//     await db.QueryAsync<Message>("SELECT * FROM public.message_board"))
//    .WithName("GetAllMessages");