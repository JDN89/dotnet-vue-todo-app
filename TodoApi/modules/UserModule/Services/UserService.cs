using System.Security.Claims;
namespace TodoApi.modules.UserModule.Services;

public class UserService : IUserService
{

    // // pass httpContect in the constructor otherwise you have to add it in the GetUser 
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger _logger;

    public UserService(IHttpContextAccessor httpContextAccessor, ILogger<UserService> logger)
    {
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;

    }

    public string GetUser()
    {
        var userId = string.Empty;
        if (_httpContextAccessor.HttpContext != null)
        {

            userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            // .FindFirstValue(ClaimTypes.NameIdentifier);
      
        }
        _logger.LogInformation(userId);

        return userId;
    }


}
