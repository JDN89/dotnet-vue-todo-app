
namespace TodoApi.modules.UserModule.Services;

public class EncryptionService : IEncryptionService
{

    //IConfiguration gives us access to app settings.json and other configuration settings
      

    // change to method with return type user
    public static Task<string> EncryptPassword(string password)
    {
        var encryptedPassword = BCrypt.Net.BCrypt.HashPassword(password);
        return Task.FromResult(encryptedPassword);

    }
    public static Task<bool> VerifyPassword(string password, string dbPassword)
    {
        var isValidPassword = BCrypt.Net.BCrypt.Verify(password, dbPassword);
        return Task.FromResult(isValidPassword);

    }

             
}