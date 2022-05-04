using Dapper;
using FluentValidation;
using FluentValidation.Results;
using Npgsql;
using TodoApi.modules.MessageModule.Endpoints.Internal;
using TodoApi.modules.UserModule.Dto;
using TodoApi.modules.UserModule.Models;
using TodoApi.modules.UserModule.Services;

namespace TodoApi.modules.UserModule.Endpoints;

public class UserEndpoints : IEndpoints
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

        app.MapPost("api/login", Login)
            .WithName("LoginUser")
            .Accepts<UserDto>(ContentType)
            .Produces<int>(200).Produces<IEnumerable<ValidationFailure>>(400).Produces(404).Produces(401)
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
        var hash = await encryptionService.EncryptPasswordAsync(oUser.PassWord!);

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

    private static async Task<IResult> Login(UserDto oUser, NpgsqlConnection db, IEncryptionService encryptionService,
        ITokenService tokenService, IValidator<UserDto> validator)
    {
        var validationResult = await validator.ValidateAsync(oUser);
        if (!validationResult.IsValid)
        {
            return Results.BadRequest(validationResult.Errors);
        }

        //check if oUser exists in db
        var user = await db.QueryFirstOrDefaultAsync<User>("SELECT * FROM users Where email=@Email", oUser);
        if (user is null)
            return Results.NotFound("user not found");

        //verify user his password
        var verified = await encryptionService.VerifyPasswordAsync(oUser.PassWord!, user.Hash!);
        if (!verified)
            return Results.Unauthorized();


        var token = tokenService.CreateToken(user);

        return Results.Ok(token);
    }


// ======================================    
// insert Services to which you offload extra logic here
// ===========================================
    public static void AddServices(IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<ITokenService, TokenService>();
        services.AddSingleton<IEncryptionService, EncryptionService>();
    }
}