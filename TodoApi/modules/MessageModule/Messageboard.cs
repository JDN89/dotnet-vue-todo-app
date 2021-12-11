namespace MessageBoard;

using Dapper;
using Npgsql;
using Carter;

using TodoApi.modules.MessageModule.models;

public class MessageModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/", GetMessages);


    }
    private async Task<IEnumerable<Message>> GetMessages(NpgsqlConnection db) =>
        await db.QueryAsync<Message>("SELECT * FROM public.message_board");

}



//         app.MapGet("/", () => "Hello World!");

// app.MapGet("/hello", async (NpgsqlConnection db) =>
//     await db.QueryAsync<Message>("SELECT * FROM public.message_board"))
//    .WithName("GetAllMessages");