namespace TodoApi.modules.MessageModule.models
{
    public record NewMessage
    {
        public string? Title { get; set; }
        public string? Body { get; set; }
    }
}