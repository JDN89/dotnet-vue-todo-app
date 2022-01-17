using Carter;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using TodoApi.modules.TodoModule.Dto;
using TodoApi.modules.TodoModule.Models;
using TodoApi.modules.UserModule.Services;

namespace TodoApi.modules.TodoModule;

//Carter: Modules are registered based on assemblies scanning and added to DI automatically
public class TodosModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/myTodos", FetchLists).RequireAuthorization("UsersOnly");
        app.MapPost("/myTodos", CreateList).RequireAuthorization();
        app.MapDelete("/myTodos", DeleteList).RequireAuthorization();
        app.MapPut("/myTodos", ArchiveTodo).WithName("UpdateList").RequireAuthorization();
        app.MapPut("/myTodos/unarchived/", UnArchiveTodo).WithName("ArchiveTodo").RequireAuthorization();

    }

    private async Task<IEnumerable<FetchedList>> FetchLists(NpgsqlConnection db, IUserService userService)
    {
        int userId = Int32.Parse(userService.GetUserId());
        return await db.QueryAsync<FetchedList>("SELECT L.id as ListId , L.title ,array_remove(ARRAY_AGG(distinct T.todo),NULL) as Todos ,array_remove(ARRAY_AGG(distinct A.archived),null)as Archived FROM todo_lists L left join todos T on(L.id = T.list_id)left join archived_todos A on(L.id = A.list_id) where L.user_id =@userId group by L.id, L.title ", new { userId });
    }


    private static async Task<IResult> CreateList(NewList newList, NpgsqlConnection db, IUserService userService)
    {
        var id = int.Parse(userService.GetUserId());
        newList.UserId = id;
        var listId = await db.QueryAsync<int>(
             "WITH ins1 AS (INSERT INTO public.todo_lists(user_id ,title) VALUES (@UserId, @Title) RETURNING id) INSERT INTO public.todos (list_id, todo) SELECT ins1.id, unnest(array[@Todos]) from ins1 returning list_id ", newList);
        return Results.Ok(listId);
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

