namespace TodoApi.modules.UserModule;
using Dapper;
using Npgsql;
using Carter;
using UserModel;
using TodoApi.modules.UserModule.Models;
using Microsoft.AspNetCore.Mvc;

public class UsersModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/register", CreateUSer);
        app.MapPost("/login", LoginUser);
    }

    private static async Task<IResult> CreateUSer(User CreateUSer, NpgsqlConnection db)
    {
        var newUser = await db.QuerySingleAsync<User>(
            "INSERT INTO public.users (email, hash) VALUES (@Email, @Hash) RETURNING * ", CreateUSer);

        return Results.Created("/register", newUser);

    }

    private static async Task<IResult> LoginUser(LoggedinUser User, NpgsqlConnection db)
    {
        var UserId = await db.QuerySingleAsync<int>(
            "SELECT id FROM users where email = @Email AND hash = @Hash", User);

        return Results.Created("/register", UserId);

    }

}
