using System.Runtime.CompilerServices;
using TodoApi.modules.UserModule.Dto;
using TodoApi.modules.UserModule.Models;

namespace TodoApi.modules.UserModule.Services;

public interface IUserDbService
{
    public Task<bool> CheckIfUserExists(UserDto user);

    public Task<User> CheckIfUserExistsAndRetrieveUserIfExists(UserDto user);
    public Task<int> StoreUserInDb(User user);
}