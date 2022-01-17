using System.Security.Claims;
namespace TodoApi.modules.UserModule.Services;

public class UserService : IUserService
{

    // // pass httpContext in the constructor otherwise you have to add it in the GetUser 
    private readonly IHttpContextAccessor _httpContextAccessor;
   

    public UserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
       

    }

    public string GetUserId()
    {
        var userId = string.Empty;
        if (_httpContextAccessor.HttpContext != null)
        {

            userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // .FindFirstValue(ClaimTypes.NameIdentifier);
      
        }
       
        return userId;
    }


}
