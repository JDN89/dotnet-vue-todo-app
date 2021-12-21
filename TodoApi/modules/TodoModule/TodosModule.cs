namespace Todos;

using Dapper;
using Npgsql;
using Carter;
using Microsoft.AspNetCore.Mvc;
using TodoApi.modules.TodoModule.Dto;
using TodoApi.modules.TodoModule.Models;

//Carter: Modules are registered based on assemblies scanning and added to DI automatically
public class TodosModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/{userId}", FetchList);
        app.MapPost("/{userId}", CreateList);
        app.MapDelete("/{userId}", DeleteList);
        app.MapPut("/{userId}", ArchiveTodo).WithName("UpdateList");


    }

    //store list ids in the frontend
    // listId necessary for deletelist DeleteList
    private async Task<IEnumerable<FetchedList>> FetchList(int id, NpgsqlConnection db) =>
          await db.QueryAsync<FetchedList>("SELECT L.id as ListId , L.title ,ARRAY_AGG(T.todo) as Todos ,ARRAY_AGG(A.archived) as Archived FROM todo_lists L inner join todos T on(L.id = T.list_id)inner join archived_todos A on(L.id = A.list_id) where L.user_id =@id group by L.id, L.title ", new { id });


    private static async Task<IResult> CreateList(CreatedList newList, NpgsqlConnection db)
    {
        var ListId = await db.QuerySingleAsync<int>(
             "WITH ins1 AS (INSERT INTO public.todo_lists(user_id ,title) VALUES (@UserId, @Title) RETURNING id) INSERT INTO public.todos (list_id, todo) SELECT ins1.id, unnest(array[@Todos]) from ins1 returning list_id ", newList);
        return Results.Created($"/{newList.UserId}", ListId);
    }

    //Foreign key set delete rule to cascade => see db. 
    private static async Task<IResult> DeleteList(int listId, NpgsqlConnection db) =>
        await db.ExecuteAsync(
            "DELETE FROM public.todo_lists WHERE id = @listId", new { listId }) == 1
            ? Results.NoContent()
            : Results.NotFound();

    private static async Task<IResult> ArchiveTodo(UpdateList archivedTodo, NpgsqlConnection db) =>

    await db.ExecuteAsync(
        "with foo as (delete from public.todos where todo = @Todo returning list_id,todo) insert into public.archived_todos (list_id,archived) select * from foo ", archivedTodo) == 1

    ? Results.NoContent()
        : Results.NotFound();


};
