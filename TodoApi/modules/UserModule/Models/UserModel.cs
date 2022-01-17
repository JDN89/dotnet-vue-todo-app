using System.ComponentModel.DataAnnotations;

namespace TodoApi.modules.UserModule.Models;

public class User
{
    [Required]
    public int Id { get; init; }
    [Required]
    public string? Email { get; init; } 
        
    public string? Hash { get; init; } 
        
}