namespace TodoApi.modules.UserModule;
using Dapper;
using Npgsql;
using Carter;
using UserModel;


public class UsersModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/register", CreateUSer);
    }

    private static async Task<IResult> CreateUSer(User CreateUSer, NpgsqlConnection db)
    {
        var newUser = await db.QuerySingleAsync<User>(
            "INSERT INTO public.users (email, hash) VALUES (@Email, @Hash) RETURNING * ", CreateUSer);

        return Results.Created("/register", newUser);


    }

}
