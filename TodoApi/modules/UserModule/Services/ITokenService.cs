

using TodoApi.modules.UserModule.Models;

namespace TodoApi.modules.UserModule.Services;

public interface ITokenService
{
    public string CreateToken(User user);
}