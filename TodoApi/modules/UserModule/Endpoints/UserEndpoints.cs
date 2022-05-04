using Dapper;
using FluentValidation;
using FluentValidation.Results;
using Npgsql;
using TodoApi.modules.UserModule.Dto;
using TodoApi.modules.UserModule.Models;
using TodoApi.modules.UserModule.Services;

namespace TodoApi.modules.UserModule.Endpoints;

public class UserEndpoints
{
    private const string ContentType = "application/json";
    private const string Tag = "Users";

    public static void DefineEndpoints(IEndpointRouteBuilder app)
    {
        app.MapPost("api/register", Register)
            .WithName("RegisterUser")
            .Accepts<UserDto>(ContentType)
            .Produces<int>(201).Produces<IEnumerable<ValidationFailure>>(400)
            .WithTags(Tag)
            .AllowAnonymous();
    }

    internal static async Task<IResult> Register(
        UserDto oUser, NpgsqlConnection db, IValidator<UserDto> validator, IEncryptionService encryptionService)
    {
        var validationResult = await validator.ValidateAsync(oUser);
        if (!validationResult.IsValid)
        {
            return Results.BadRequest(validationResult.Errors);
        }

        //check if user exists in DB
        var exists = await db.QueryFirstOrDefaultAsync<bool>("SELECT * FROM public.users Where email=@Email", oUser);
        if (exists)
        {
            return Results.BadRequest("user is already registered");
        }

// null check not necessary => UserDto validator checks for null
        var hash = await EncryptionService.EncryptPassword(oUser.PassWord!);

        var newUser = new User
        {
            Id = 0,
            Email = oUser.Email,
            Hash = hash
        };

        var newUserId = await db.QuerySingleAsync(
            "INSERT INTO users (email, hash) VALUES (@Email, @Hash) RETURNING id ", newUser);
        return Results.Created("api/register", newUserId);
    }


// ======================================    
// insert Services to which you offload extra logic here
// ===========================================
    public static void AddServices(IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<IUserService, UserService>();
        services.AddSingleton<ITokenService, TokenService>();
        services.AddSingleton<IEncryptionService, EncryptionService>();
    }
}