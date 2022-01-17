namespace TodoApi.modules.TodoModule.Models;

public record NewList
{
    public int? UserId { get; set; }
    public string? Title { get; set; }
    public string[]? Todos { get; set; }

}