using System.ComponentModel.DataAnnotations;

namespace TodoApi.modules.UserModule.Models
{
    public class LoggedinUser
    {
        [Required]
        public string? Email { get; set; }
        [Required]
        public String? Hash { get; set; }
    }
}