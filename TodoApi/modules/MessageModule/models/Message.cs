using System.ComponentModel.DataAnnotations;

namespace TodoApi.modules.MessageModule.models
{
    public record Message
    {
        [Required]
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Body { get; set; }

    }

  }