namespace Todos;


using Dapper;
using Npgsql;
using Carter;
using Microsoft.AspNetCore.Mvc;
using TodoApi.modules.TodoModule.Dto;

//Carter: Modules are registered based on assemblies scanning and added to DI automatically
public class TodosModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/{userId}", FetchList);



    }


    private async Task<IEnumerable<NewList>> FetchList(int id, NpgsqlConnection db) =>
          await db.QueryAsync<NewList>("SELECT L.id as ListId , L.title ,ARRAY_AGG(T.todo) as Todos ,ARRAY_AGG(A.archived) as Archived FROM todo_lists L inner join todos T on(L.id = T.list_id)inner join archived_todos A on(L.id = A.list_id) where L.user_id =@id group by L.id, L.title ", new { id });

}


