namespace TodoApi.modules.TodoModule.Dto
{
    public class NewList
    {
        public int userID { get; set; }
        public string? Title { get; set; }
        public string[]? Todos { get; set; }
        public string[]? ARchived { get; set; }
    }
}