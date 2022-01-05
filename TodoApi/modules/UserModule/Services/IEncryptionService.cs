namespace TodoApi.modules.UserModule.Services
{
    public interface IEncryptionService
    {
        public Task<string> EncryptPassword(string password);
        public Task<bool> VerifyPassword(string password, string dbPassword);
    }
}