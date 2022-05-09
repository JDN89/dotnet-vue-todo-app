using Dapper;
using TodoApi.Data;
using TodoApi.modules.UserModule.Dto;
using TodoApi.modules.UserModule.Models;

namespace TodoApi.modules.UserModule.Services;


public class UserDbService:IUserDbService
{
    private readonly IDbConnectionFactory _connectionFactory;

    public UserDbService(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }
    public async Task<bool> CheckIfUserExists(UserDto user)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        return await connection.QueryFirstOrDefaultAsync<bool>("SELECT * FROM public.users Where email=@Email", user);
    }
    
    public async Task<User> CheckIfUserExistsAndRetrieveUserIfExists(UserDto user)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        return await connection.QueryFirstOrDefaultAsync<User>("SELECT * FROM public.users Where email=@Email", user);
    }

    public async Task<int> StoreUserInDb(User user)
    {
        
        using var connection = await _connectionFactory.CreateConnectionAsync();
       return await connection.QuerySingleAsync(
                                 "INSERT INTO users (email, hash) VALUES (@Email, @Hash) RETURNING id ", user);
    }
}