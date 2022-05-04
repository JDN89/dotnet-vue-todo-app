using Dapper;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using TodoApi.modules.MessageModule.Endpoints.Internal;
using TodoApi.modules.TodoModule.Dto;
using TodoApi.modules.TodoModule.Models;
using TodoApi.modules.UserModule.Services;

namespace TodoApi.modules.TodoModule.Endpoints;

public class TodoEndpoints : IEndpoints
{
    private const string ContentType = "application/json";
    private const string Tag = "Todos";

    public static void DefineEndpoints(IEndpointRouteBuilder app)
    {
        app.MapGet("api/myTodos", FetchLists).RequireAuthorization("UsersOnly").WithName("Fetch Lists").WithTags(Tag)
            .Produces<IEnumerable<FetchedList>>();
        app.MapPost("api/myTodos", CreateList).RequireAuthorization("UsersOnly").WithName("CreateList").WithTags(Tag)
            .Accepts<NewList>(ContentType).Produces<IEnumerable<ValidationFailure>>(400);
        app.MapDelete("api/myTodos", DeleteList).RequireAuthorization("UsersOnly").WithName("DeleteList").WithTags(Tag)
            .Produces(204).Produces(404);
        app.MapPost("api/myTodos/todo", AddNewTodo).RequireAuthorization("UsersOnly").WithName("AddNewTodo")
            .WithTags(Tag).Produces<IEnumerable<ValidationFailure>>(400).Accepts<ArchiveTodo>(ContentType);
        app.MapPut("api/myTodos/archived", ArchiveTheTodo).WithName("ArchiveTodo").RequireAuthorization("UsersOnly")
            .WithTags(Tag).Produces(204).Produces<IEnumerable<ValidationFailure>>(400)
            .Accepts<ArchiveTodo>(ContentType);
        app.MapPut("api/myTodos/unarchived/", UnArchiveTodo).WithName("UnArchiveTodo")
            .WithTags(Tag)
            .RequireAuthorization("UsersOnly").Produces(204).Produces<IEnumerable<ValidationFailure>>(400)
            .Accepts<ArchiveTodo>(ContentType);
        ;
    }


    internal static async Task<IEnumerable<FetchedList>> FetchLists(NpgsqlConnection db, IUserService userService)
    {
        var userId = int.Parse(userService.GetUserId());
        return await db.QueryAsync<FetchedList>(
            "SELECT L.id as ListId , L.title ,array_remove(ARRAY_AGG( distinct T.todo),NULL) as Todos ,array_remove(ARRAY_AGG(distinct A.archived),null)as Archived FROM todo_lists L left join todos T on(L.id = T.list_id)left join archived_todos A on(L.id = A.list_id) where L.user_id =@userId group by L.id, L.title ",
            new {userId});
    }

    private static async Task<IResult> CreateList(NewList newList, NpgsqlConnection db, IUserService userService,
        IValidator<NewList> validator)
    {
        var validationResult = await validator.ValidateAsync(newList);
        if (!validationResult.IsValid)
        {
            return Results.BadRequest(validationResult.Errors);
        }

        var id = int.Parse(userService.GetUserId());
        newList.UserId = id;
        var listId = await db.QueryAsync<int>(
            "WITH ins1 AS (INSERT INTO todo_lists(user_id ,title) VALUES (@UserId, @Title) RETURNING id) INSERT INTO todos (list_id, todo) SELECT ins1.id, unnest(array[@Todos]) from ins1 returning list_id ",
            newList);
        return Results.Ok(listId);
    }

    internal static async Task<IResult> DeleteList([FromQuery] int listId, NpgsqlConnection db) =>
        await db.ExecuteAsync(
            "DELETE FROM todo_lists WHERE id = @listId", new {listId}) == 1
            ? Results.NoContent()
            : Results.NotFound();


    private static async Task<IResult> AddNewTodo(ArchiveTodo newTodo, NpgsqlConnection db,
        IValidator<ArchiveTodo> validator)
    {
        var validationResult = await validator.ValidateAsync(newTodo);
        if (!validationResult.IsValid)
        {
            return Results.BadRequest(validationResult.Errors);
        }

        var todoId = await db.QueryAsync<int>(
            "insert into todos (list_id,todo) VALUES (@ListId, @Todo) returning id",
            newTodo);
        return Results.Ok(todoId);
    }

    // filter on todo and list_id otherwise db malfunctions
    // when you filter only on todo and there are is a similar todo in another table
    // same issue with archive id
    // another solution is to send the todoId and archiveId to the frontend with the fetchLists request
    // and then send it back with every archive and unarchive request
    // and then select where id = @todoId || id =@archiveId

    private static async Task<IResult> ArchiveTheTodo(ArchiveTodo archivedTodo, NpgsqlConnection db,
        IValidator<ArchiveTodo> validator)
    {
        var validationResult = await validator.ValidateAsync(archivedTodo);
        if (!validationResult.IsValid)
        {
            return Results.BadRequest(validationResult.Errors);
        }

        return await db.ExecuteAsync(
            "with foo as (delete from todos where todo = @Todo AND list_id = @ListId returning list_id,todo) insert into archived_todos (list_id,archived) select * from foo ",
            archivedTodo) == 1
            ? Results.NoContent()
            : Results.NotFound();
    }

    private static async Task<IResult> UnArchiveTodo(ArchiveTodo unArchivedTodo, NpgsqlConnection db,
        IValidator<ArchiveTodo> validator)
    {
        var validationResult = await validator.ValidateAsync(unArchivedTodo);
        if (!validationResult.IsValid)
        {
            return Results.BadRequest(validationResult.Errors);
        }

        return await db.ExecuteAsync(
            "with foo as (delete from archived_todos where archived = @Todo AND list_id = @ListId returning list_id,archived) insert into todos (list_id,todo) select * from foo ",
            unArchivedTodo) == 1
            ? Results.NoContent()
            : Results.NotFound();
    }
    //=======================
    // ================ Add Services in DI
    // =========================

    public static void AddServices(IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<IUserService, UserService>();
    }
}