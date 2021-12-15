namespace TodoApi.modules.TodoModule.Models
{
    public class DeleteList
    {


        public int UserId { get; set; }
        public string? Title { get; set; }
        public String[]? Todos { get; set; }
        public String[]? Archive { get; set; }


    }
}