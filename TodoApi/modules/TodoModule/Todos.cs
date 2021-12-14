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


    //check udemy cours 44 and 45

    private static async Task<IResult> CreateList(CreatedList newList, NpgsqlConnection db)
    {
        var createdList = await db.QueryAsync<CreatedList>(
             "WITH ins1 AS (INSERT INTO public.todo_lists(user_id ,title) VALUES (@UserId, @Title) RETURNING id) INSERT INTO public.todos (list_id, todo) SELECT ins1.id, unnest(array[@Todos]) from ins1 ", newList);

        return Results.Ok();
    }


    //quest to ask in google: insert multiple rows into some table for every row in another table: unnest array

    // PostgreSQL UNNEST() function
    // Last update on October 20 2021 11:05:11 (UTC/GMT +8 hours)
    // UNNEST() function

    // This function is used to expand an array to a set of rows.

    //example below value 1 is userID
    // so i have to unest the todos array
    //in my case user_id = list_id
    // subservice_id = todos
    // same with archived

    // https://stackoverflow.com/questions/20815028/how-do-i-insert-multiple-values-into-a-postgres-table-at-once

    //     CREATE TABLE user_subservices(
    //   user_id        integer ,
    //  subservice_id  text
    // );


    // insert into user_subservices(user_id, subservice_id) 
    // values(1, unnest(array['sfsdfsdf', 'sdfsfdsf', 'sdfsdfsdf']));

};

