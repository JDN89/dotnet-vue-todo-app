using TodoApi.modules.UserModule.Dto;

using Dapper;
using Npgsql;

namespace TodoApi.modules.UserModule.Services
{
    public class AuthService : IAuthService
    {

        //IConfiguration gives us access to appsettings.json and other configuration settings
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;


        }

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

        private void CreatePasswordHash(string password, out byte[] hashed, out byte[] salt)
        {

            using (var hmac = new System.Security.Cryptography.HMACSHA256())
            {
                salt = hmac.Key;
                hashed = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }

    }


}