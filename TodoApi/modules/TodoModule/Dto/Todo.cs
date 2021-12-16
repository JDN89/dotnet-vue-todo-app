namespace TodoApi.modules.TodoModule.Dto
{
    public class Todo
    {
        public int Id { get; set; }
        public int? ListId { get; set; }
        public String[]? Todos { get; set; }
    }
}