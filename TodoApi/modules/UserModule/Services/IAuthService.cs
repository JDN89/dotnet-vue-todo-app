using TodoApi.modules.UserModule.Models;
using TodoApi.modules.UserModule.Dto;
using Npgsql;



namespace TodoApi.modules.UserModule.Services
{
    public interface IAuthService
    {
         public Task<Boolean> Register  ( UserDto oUser);
       public bool VerifyPasswordHash(string password, byte [] passwordHash, byte[] passwordSalt);
    }
}