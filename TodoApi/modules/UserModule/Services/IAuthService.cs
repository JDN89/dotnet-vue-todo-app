using TodoApi.modules.UserModule.Models;
using TodoApi.modules.UserModule.Dto;
using Npgsql;



namespace TodoApi.modules.UserModule.Services
{
    public interface IAuthService
    {
        public Task<string> EncryptPassword(string password);
        public Task<bool> VerifyPassword(string password, string dbPassword);
    }
}