namespace TodoApi.modules.UserModule;
using Dapper;
using Npgsql;
using Carter;
using UserModel;
using TodoApi.modules.UserModule.Models;

public class UsersModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/register", CreateUSer).AllowAnonymous();
        app.MapPost("/login", LoginUser).AllowAnonymous();
    }

    private static async Task<IResult> CreateUSer(User CreatedUSer, NpgsqlConnection db)
    {
        var newUserId = await db.QuerySingleAsync(
            "INSERT INTO public.users (email, hash) VALUES (@Email, @Hash) RETURNING id ", CreatedUSer);

        return Results.Ok();

    }

    private static async Task<IResult> LoginUser(LoggedinUser User, NpgsqlConnection db)
    {
        int UserId = await db.QuerySingleAsync<int>(
            "SELECT id FROM users where email = @Email AND hash = @Hash", User);

        return Results.Ok(UserId);

    }

}
