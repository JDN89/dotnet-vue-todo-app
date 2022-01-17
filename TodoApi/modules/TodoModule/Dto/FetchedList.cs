namespace TodoApi.modules.TodoModule.Dto
{
    public record FetchedList
    {
        public int ListId { get; set; }
        public string? Title { get; set; }
        public string[]? Todos { get; set; }
        public string[]? Archived { get; set; }
    }
}