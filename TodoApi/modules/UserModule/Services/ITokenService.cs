

using TodoApi.modules.UserModule.Models;

namespace TodoApi.modules.UserModule.Services
{
    public interface ITokenService
    {
        public String CreateToken(User user);
    }
}