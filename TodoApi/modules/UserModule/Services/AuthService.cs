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
        public async  Task<string> Register(string password)
        {
             var encryptedPassword =   BCrypt.Net.BCrypt.HashPassword(password);
             return encryptedPassword;


        }

        private void CreatePasswordHash(string password, out byte[] hashed, out byte[] salt)
        {

            using (var hmac = new System.Security.Cryptography.HMACSHA256())
            {
                salt = hmac.Key;
                hashed = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }

        //different hashing method in verification methods, use the same as in the rpg
        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA256(passwordSalt))
            {
                Console.WriteLine($"Hashed: {passwordHash}");
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                Console.WriteLine($"ComputedHashed: {computedHash}");
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]
                    ) { return false; }
                }
                return true;
            }
        }











    }


}