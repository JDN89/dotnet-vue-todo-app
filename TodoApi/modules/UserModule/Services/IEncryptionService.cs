namespace TodoApi.modules.UserModule.Services;

public interface IEncryptionService
{
    public Task<string> EncryptPasswordAsync(string password);

    public Task<bool> VerifyPasswordAsync(string password, string dbPassword);
}