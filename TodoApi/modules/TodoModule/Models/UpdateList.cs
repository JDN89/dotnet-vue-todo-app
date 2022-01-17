namespace TodoApi.modules.TodoModule.Models;

public record UpdateList
{
    public int ListId { get; set; }
    public string? Todo { get; set; }

}