using Microsoft.Extensions.Configuration;
using TodoApi.modules.UserModule.Models;

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
        public async Task<EncryptedPassword> CreateHash(User user, string password)
        {

            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            EncryptedPassword encryptedPassword = new();
            encryptedPassword.Hash = passwordHash;
            encryptedPassword.Salt = passwordSalt;
            ;



            return encryptedPassword;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }


    }


}