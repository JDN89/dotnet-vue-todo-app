
using TodoApi.modules.TodoModule.Dto;
using TodoApi.modules.TodoModule.Models;

namespace TodoApi.modules.TodoModule.Services;


public interface ITodoService
{
    public Task<IEnumerable<FetchedList>> FetchLists(int userId);

    public Task<IEnumerable<int>> CreateList(NewList newList );
    public Task<bool> DeleteList(int listId );
    public Task<IEnumerable<int>> AddNewTodo(ArchiveTodo newTodo );

    public Task<bool> ArchiveTodo(ArchiveTodo archiveTodo );

    public Task<bool> UnArchiveTodo(ArchiveTodo unArchivedTodo );
}
