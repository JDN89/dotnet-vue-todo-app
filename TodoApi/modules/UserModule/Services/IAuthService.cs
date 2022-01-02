using TodoApi.modules.UserModule.Models;

namespace TodoApi.modules.UserModule.Services
{
    public interface IAuthService
    {
        public User CreateHash(User user, string password);
    }
}