using TodoApi.modules.UserModule.Dto;

using Dapper;
using Npgsql;

namespace TodoApi.modules.UserModule.Services
{
    public class EncryptionService : IEncryptionService
    {

        //IConfiguration gives us access to appsettings.json and other configuration settings
      

        // change to method with return type user
        public async Task<string> EncryptPassword(string password)
        {
            var encryptedPassword = BCrypt.Net.BCrypt.HashPassword(password);
            return encryptedPassword;

        }
        public async Task<bool> VerifyPassword(string password, string dbPassword)
        {
            bool isValidPassword = BCrypt.Net.BCrypt.Verify(password, dbPassword);
            return isValidPassword;

        }

             
    }


}