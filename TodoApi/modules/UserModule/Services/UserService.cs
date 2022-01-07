using TodoApi.modules.UserModule.Models;
using TodoApi.modules.UserModule.Dto;
using Npgsql;
using System.Security.Claims;

namespace TodoApi.modules.UserModule.Services;


public class UserService : IUserService
{

    // // pass httpContect in the constructor otherwise you have to add it in the GetUser 
    private readonly IHttpContextAccessor _httpContextAccessor;


    public UserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;


    }

    public string GetUser()
    {
        var result = string.Empty;
        if(_httpContextAccessor.HttpContext !=null)
        {
            result = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
        }
        return result;
    }


}
