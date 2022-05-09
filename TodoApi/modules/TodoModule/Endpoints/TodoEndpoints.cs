using Dapper;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using TodoApi.modules.MessageModule.Endpoints.Internal;
using TodoApi.modules.TodoModule.Dto;
using TodoApi.modules.TodoModule.Models;
using TodoApi.modules.TodoModule.Services;
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


    internal static async Task<IEnumerable<FetchedList>> FetchLists(ITodoService todoService, IUserService userService)
    {
        var userId = int.Parse(userService.GetUserId());
        return await todoService.FetchLists(userId);
    }

    private static async Task<IResult> CreateList(NewList newList, ITodoService todoService, IUserService userService,
        IValidator<NewList> validator)
    {
        var validationResult = await validator.ValidateAsync(newList);
        if (!validationResult.IsValid)
        {
            return Results.BadRequest(validationResult.Errors);
        }

        var id = int.Parse(userService.GetUserId());
        newList.UserId = id;
        var listId =await todoService.CreateList(newList);
        return Results.Ok(listId);
    }

    internal static async Task<IResult> DeleteList([FromQuery] int listId, ITodoService todoService)
    {

       return  await todoService.DeleteList(listId) ? Results.NoContent() : Results.NotFound(); 
    }
            


    private static async Task<IResult> AddNewTodo(ArchiveTodo newTodo, ITodoService todoService,
        IValidator<ArchiveTodo> validator)
    {
        var validationResult = await validator.ValidateAsync(newTodo);
        if (!validationResult.IsValid)
        {
            return Results.BadRequest(validationResult.Errors);
        }

        var todoId = await todoService.AddNewTodo(newTodo);
        
        return Results.Ok(todoId);
    }

    // filter on todo and list_id otherwise db malfunctions
    // when you filter only on todo and there are is a similar todo in another table
    // same issue with archive id
    // another solution is to send the todoId and archiveId to the frontend with the fetchLists request
    // and then send it back with every archive and unarchive request
    // and then select where id = @todoId || id =@archiveId

    private static async Task<IResult> ArchiveTheTodo(ArchiveTodo archivedTodo, ITodoService todoService,
        IValidator<ArchiveTodo> validator)
    {
        var validationResult = await validator.ValidateAsync(archivedTodo);
        if (!validationResult.IsValid)
        {
            return Results.BadRequest(validationResult.Errors);
        }

        return await todoService.ArchiveTodo(archivedTodo) ? Results.NoContent() : Results.NotFound();
    }

    private static async Task<IResult> UnArchiveTodo(ArchiveTodo unArchivedTodo, ITodoService todoService,
        IValidator<ArchiveTodo> validator)
    {
        var validationResult = await validator.ValidateAsync(unArchivedTodo);
        if (!validationResult.IsValid)
        {
            return Results.BadRequest(validationResult.Errors);
        }

        return await todoService.UnArchiveTodo(unArchivedTodo) ? Results.NoContent() : Results.NotFound();
            
    }
    //=======================
    // ================ Add Services in DI
    // =========================

    public static void AddServices(IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<IUserService, UserService>();
        services.AddSingleton<ITodoService, TodoService>();
    }
}