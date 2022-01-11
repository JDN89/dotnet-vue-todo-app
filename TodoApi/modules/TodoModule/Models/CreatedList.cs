namespace TodoApi.modules.TodoModule.Models
{
    public class NewList
    {
        public int? UserId { get; set; }
        public string? Title { get; set; }
        public String[]? Todos { get; set; }

    }
}