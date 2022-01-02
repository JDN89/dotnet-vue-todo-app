using TodoApi.modules.UserModule.Models;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

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
        public User CreateHash(User user, string password)
        {

            CreatePasswordHash(password, out string hashed, out byte[] salt);


            user.Hash = hashed;
            user.Salt = salt;

            return user;
        }

        private void CreatePasswordHash(string password, out string hashed, out byte[] salt)
        {

            // generate a 128-bit salt using a cryptographically strong random sequence of nonzero values
            salt = new byte[128 / 8];
            using (var rngCsp = new RNGCryptoServiceProvider())
            {
                rngCsp.GetNonZeroBytes(salt);
            }

            hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
              password: password,
              salt: salt,
              prf: KeyDerivationPrf.HMACSHA256,
              iterationCount: 100000,
              numBytesRequested: 256 / 8));
            Console.WriteLine($"Hashed: {hashed}");

        }











    }


}