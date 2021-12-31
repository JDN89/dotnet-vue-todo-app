using TodoApi.modules.UserModule.Models;

namespace TodoApi.modules.UserModule.Services
{
    public interface IAuthService
    {
        public Task<EncryptedPassword> CreateHash(User user, string password);
    }
}