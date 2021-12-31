namespace TodoApi.modules.UserModule.Models
{
    public record EncryptedPassword
    {
        public byte [] Hash { get; set; } 
        public byte [] Salt { get; set; }
        
        
        
    }
}