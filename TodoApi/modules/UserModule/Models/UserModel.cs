using System.ComponentModel.DataAnnotations;

namespace TodoApi.modules.UserModule.Models
{
    public class User
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Email { get; set; } = string.Empty;
        
          public string Hash { get; set; } = string.Empty;
        
    }
}