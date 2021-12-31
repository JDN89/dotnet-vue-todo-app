using System.ComponentModel.DataAnnotations;

namespace TodoApi.modules.UserModule.Models
{
    public class User
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
          public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}