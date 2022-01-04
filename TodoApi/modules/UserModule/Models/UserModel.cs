using System.ComponentModel.DataAnnotations;

namespace TodoApi.modules.UserModule.Models
{
    public class User
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string? Email { get; set; } 
        
          public string? Hash { get; set; } 
        
    }
}