namespace TodoApi.modules.UserModule;
using Dapper;
using Npgsql;
using Carter;
using Dto;
using Models;
using Services;

public class UsersModule : ICarterModule
{
    // inject the AuthService via namespace usage
    //alternative do it via DI = cleaner
    // ------------
    //With Minimal APIs we can still benefit from dependency injection but instead of using constructor injection, 
    //the dependencies are passed as parameters in the handler delegate:
    // This approach is slightly more pure and can make testing easier. The downside is that 
    //once you get to more than a few dependencies your handler definitions can become quite noisy.
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/register", Register).AllowAnonymous();
        app.MapPost("/login", LoginUser).AllowAnonymous();
    }

    private static async Task<IResult> Register(UserDto oUser, NpgsqlConnection db, IEncryptionService encryptionService)
    {

        //new way of checking for null: c#10
        ArgumentNullException.ThrowIfNull(oUser.Email);

        //check if user exists in DB
        var exists = await db.QueryFirstOrDefaultAsync<bool>("SELECT * FROM public.users Where email=@Email", oUser);
        if (exists)
        {

            return Results.BadRequest("user is already registered");
        }

        ArgumentNullException.ThrowIfNull(oUser.PassWord);
        //hash password via Bcrypt
        var hash = await EncryptionService.EncryptPassword(oUser.PassWord);

        var newUser = new User
        {
            Id = 0,
            Email = oUser.Email,
            Hash = hash
        };
       

        var newUserId = await db.QuerySingleAsync(
            "INSERT INTO public.users (email, hash) VALUES (@Email, @Hash) RETURNING id ", newUser);
        return Results.Ok(newUserId);

    }

    private static async Task<IResult> LoginUser(UserDto oUser, NpgsqlConnection db, IEncryptionService encryptionService, ITokenService tokenService)
    {

        ArgumentNullException.ThrowIfNull(oUser.Email);
        //check if oUser exists in db
        User user = await db.QueryFirstOrDefaultAsync<User>("SELECT * FROM public.users Where email=@Email", oUser);
        if (user == null)
            return Results.NotFound("user not found");

        ArgumentNullException.ThrowIfNull(oUser.PassWord);
        ArgumentNullException.ThrowIfNull(user.Hash);
        //verify user his password
        var verified = await EncryptionService.VerifyPassword(oUser.PassWord, user.Hash);
        if (!verified)
            return Results.Unauthorized();


        string token = tokenService.CreateToken(user);

        return Results.Ok(token); 

    }

}
