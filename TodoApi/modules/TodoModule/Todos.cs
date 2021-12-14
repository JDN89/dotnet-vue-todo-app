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



    }


    private async Task<IEnumerable<FetchedList>> FetchList(int id, NpgsqlConnection db) =>
          await db.QueryAsync<FetchedList>("SELECT L.id as ListId , L.title ,ARRAY_AGG(T.todo) as Todos ,ARRAY_AGG(A.archived) as Archived FROM todo_lists L inner join todos T on(L.id = T.list_id)inner join archived_todos A on(L.id = A.list_id) where L.user_id =@id group by L.id, L.title ", new { id });



    private static async Task<IResult> CreateList(NewList newList, NpgsqlConnection db)
    {
        var createdList = await db.QuerySingleAsync<NewList>(
            "INSERT INTO public.messages (title, body) VALUES (@Title, @Body) RETURNING * ", newList);

        return Results.Created("/{userId}", createdList);


    }

};

