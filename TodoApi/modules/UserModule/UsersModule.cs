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

    private static async Task<IResult> Register(UserDto CreatedUSer, NpgsqlConnection db, IAuthService AuthService)
    {
        //check if user exists in DB

        //new way of checking for null: c#10
        ArgumentNullException.ThrowIfNull(CreatedUSer.PassWord);


        var response = AuthService.CreateHash(
                new User { Email = CreatedUSer.Email }, CreatedUSer.PassWord
            );

        // log response with privatelogger

        //store response in db

        // var newUserId = await db.QuerySingleAsync(
        //     "INSERT INTO public.users (email, hash) VALUES (@Email, @Hash) RETURNING id ", CreatedUSer);

        return Results.Ok(response);

    }

    private static async Task<IResult> LoginUser(LoggedinUser User, NpgsqlConnection db)
    {
        int UserId = await db.QuerySingleAsync<int>(
            "SELECT id FROM users where email = @Email AND hash = @Hash", User);

        return Results.Ok(UserId);

    }

}
