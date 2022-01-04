using TodoApi.modules.UserModule.Models;
using TodoApi.modules.UserModule.Dto;
using Npgsql;



namespace TodoApi.modules.UserModule.Services
{
    public interface IAuthService
    {
        public Task<string> Register(string password);
        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt);
    }
}