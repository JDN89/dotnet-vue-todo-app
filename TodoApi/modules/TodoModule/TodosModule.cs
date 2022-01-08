namespace Todos;

using Dapper;
using Npgsql;
using Carter;
using Microsoft.AspNetCore.Mvc;
using TodoApi.modules.TodoModule.Dto;
using TodoApi.modules.TodoModule.Models;
using TodoApi.modules.UserModule.Services;


//Carter: Modules are registered based on assemblies scanning and added to DI automatically
public class TodosModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/{userId}", FetchLists).RequireAuthorization("UsersOnly");
        app.MapPost("/{userId}", CreateList).RequireAuthorization();
        app.MapDelete("/{userId}", DeleteList).RequireAuthorization();
        app.MapPut("/{userId}", ArchiveTodo).WithName("UpdateList").RequireAuthorization();
        app.MapPut("/unarchive/{userId}", UnArchiveTodo).WithName("ArchiveTodo").RequireAuthorization();


    }

    //store list ids in the frontend
    // listId necessary for deletelist DeleteList
    private async Task<IEnumerable<FetchedList>> FetchLists([FromQuery] int userId, NpgsqlConnection db, IUserService userService)
    {
        int pwe = Int32.Parse(userService.GetUser());
        return await db.QueryAsync<FetchedList>("SELECT L.id as ListId , L.title ,array_remove(ARRAY_AGG(distinct T.todo),NULL) as Todos ,array_remove(ARRAY_AGG(distinct A.archived),null)as Archived FROM todo_lists L left join todos T on(L.id = T.list_id)left join archived_todos A on(L.id = A.list_id) where L.user_id =@pwe group by L.id, L.title ", new { pwe });
    }


    // CHORE: figure how to return single list Id instead of multiple list id's
    // QuerySingleAsync is not the solution, throw IEnumerable error
    private static async Task<IResult> CreateList(CreatedList newList, NpgsqlConnection db)
    {
        var ListId = await db.QueryAsync<int>(
             "WITH ins1 AS (INSERT INTO public.todo_lists(user_id ,title) VALUES (@UserId, @Title) RETURNING id) INSERT INTO public.todos (list_id, todo) SELECT ins1.id, unnest(array[@Todos]) from ins1 returning list_id ", newList);
        return Results.Ok($"/{newList.UserId}");
    }

    //Foreign key set delete rule to cascade => see db. 
    private static async Task<IResult> DeleteList([FromQuery] int listId, NpgsqlConnection db) =>
        await db.ExecuteAsync(
            "DELETE FROM public.todo_lists WHERE id = @listId", new { listId }) == 1
            ? Results.NoContent()
            : Results.NotFound();

    private static async Task<IResult> ArchiveTodo(UpdateList archivedTodo, NpgsqlConnection db) =>

    await db.ExecuteAsync(
        "with foo as (delete from public.todos where todo = @Todo returning list_id,todo) insert into public.archived_todos (list_id,archived) select * from foo ", archivedTodo) == 1

    ? Results.NoContent()
        : Results.NotFound();

    private static async Task<IResult> UnArchiveTodo(ArchiveTodo unArchivedTodo, NpgsqlConnection db) =>

     await db.ExecuteAsync(
         "with foo as (delete from public.archived_todos where archived = @Archived returning list_id,archived) insert into public.todos (list_id,todo) select * from foo ", unArchivedTodo) == 1

     ? Results.NoContent()
         : Results.NotFound();

};

