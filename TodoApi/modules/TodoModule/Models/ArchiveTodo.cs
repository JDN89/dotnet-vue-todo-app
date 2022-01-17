namespace TodoApi.modules.TodoModule.Models
{
    public record ArchiveTodo
    {
        public int ListId { get; set; }
        public string? Archived { get; set; }
    }
}