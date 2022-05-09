using Dapper;
using TodoApi.Data;
using TodoApi.modules.TodoModule.Dto;
using TodoApi.modules.TodoModule.Models;

namespace TodoApi.modules.TodoModule.Services;

public class TodoService : ITodoService
{
    private readonly IDbConnectionFactory _connectionFactory;

    public TodoService(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<FetchedList>> FetchLists(int userId)

    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        return await connection.QueryAsync<FetchedList>(
            "SELECT L.id as ListId , L.title ,array_remove(ARRAY_AGG( distinct T.todo),NULL) as Todos ,array_remove(ARRAY_AGG(distinct A.archived),null)as Archived FROM todo_lists L left join todos T on(L.id = T.list_id)left join archived_todos A on(L.id = A.list_id) where L.user_id =@userId group by L.id, L.title ",
            new {userId});
    }

    public async Task<IEnumerable<int>> CreateList(NewList newList)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();

        return await connection.QueryAsync<int>(
            "WITH ins1 AS (INSERT INTO todo_lists(user_id ,title) VALUES (@UserId, @Title) RETURNING id) INSERT INTO todos (list_id, todo) SELECT ins1.id, unnest(array[@Todos]) from ins1 returning list_id ",
            newList);
    }

    public async Task<bool> DeleteList(int listId)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        return await connection.ExecuteAsync(
            "DELETE FROM todo_lists WHERE id = @listId", new {listId}) == 1;
    }

    public async Task<IEnumerable<int>> AddNewTodo(ArchiveTodo newTodo)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        return await
            connection.QueryAsync<int>(
                "insert into todos (list_id,todo) VALUES (@ListId, @Todo) returning id",
                newTodo);
    }

    public async Task<bool> ArchiveTodo(ArchiveTodo archivedTodo)
    {
        
        using var connection = await _connectionFactory.CreateConnectionAsync();

        return await connection.ExecuteAsync(
            "with foo as (delete from todos where todo = @Todo AND list_id = @ListId returning list_id,todo) insert into archived_todos (list_id,archived) select * from foo ",
            archivedTodo) == 1;
    }

    public async Task<bool> UnArchiveTodo(ArchiveTodo unArchivedTodo)
    {
        
        using var connection = await _connectionFactory.CreateConnectionAsync();
        return await connection.ExecuteAsync(
            "with foo as (delete from archived_todos where archived = @Todo AND list_id = @ListId returning list_id,archived) insert into todos (list_id,todo) select * from foo ",
            unArchivedTodo) == 1;

    }
}