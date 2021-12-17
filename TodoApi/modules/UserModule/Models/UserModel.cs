using System.ComponentModel.DataAnnotations;

namespace UserModel
{
    public class User
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public String? Hash { get; set; }
    }
}