using System.ComponentModel.DataAnnotations;

namespace TodoApi.modules.MessageModule.models
{
    public class Message
    {
        public int Id { get; set; }
        [Required]
        public string? Title { get; set; }
        public string? Body { get; set; }

    }
}