namespace TodoApi.modules.UserModule;
using Dapper;
using Npgsql;
using Carter;
using TodoApi.modules.UserModule.Dto;
using TodoApi.modules.UserModule.Models;
using TodoApi.modules.UserModule.Services;

public class UsersModule : ICarterModule
{
    //normally we would inject a service via services.addScoped<>()
    // into a controller
    // but here I don't use controllers
    // so I'll inject the AuthService via namespace usage
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

    private static async Task<IResult> Register(UserDto oUser, NpgsqlConnection db, IAuthService AuthService)
    {

        //new way of checking for null: c#10
        ArgumentNullException.ThrowIfNull(oUser.Email);

        //check if user exists in DB
        var exists = await db.QueryFirstOrDefaultAsync<bool>("SELECT * FROM public.users Where email=@Email", oUser);
        Console.WriteLine($"{exists}");
        if (exists != false)
        {

            return Results.BadRequest("user is allready registered");
        }

        ArgumentNullException.ThrowIfNull(oUser.PassWord);
        //hash password via Bcrypt
        var hashed = await AuthService.Register(oUser.PassWord);

        User newUser = new User();

        newUser.Email = oUser.Email;
        newUser.Hash = hashed;

        var newUserId = await db.QuerySingleAsync(
            "INSERT INTO public.users (email, hash) VALUES (@Email, @Hash) RETURNING id ", newUser);
        return Results.Ok(newUser);

        // log response with privatelogger

        //store response in db


        // return Results.Ok(response)

    }

    private static async Task<IResult> LoginUser(LoggedinUser loggedinUser, NpgsqlConnection db, IAuthService AuthService)
    {

        // User user = await db.QuerySingleAsync<User>(
        //     "SELECT * FROM users where email = @Email", loggedinUser);
        // ArgumentNullException.ThrowIfNull(user);
        // ArgumentNullException.ThrowIfNull(user.Hash);
        // ArgumentNullException.ThrowIfNull(loggedinUser.Password);


        // Console.WriteLine($"test:  {AuthService.VerifyPasswordHash(loggedinUser.Password, user.Hash)}");

        // if (!AuthService.VerifyPasswordHash(loggedinUser.Password, user.Hash))
        // {

        //     return Results.BadRequest();
        // }

        return Results.Ok();

    }

}
