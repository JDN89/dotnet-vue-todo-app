namespace TodoApi.modules.UserModule.Models
{
    public record EncryptedPassword
    {
        public string? Hashed { get; set; }
        public byte[]? Salt { get; set; }



    }
}