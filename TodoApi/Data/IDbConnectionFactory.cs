using System.Data;

namespace TodoApi.Data;

public interface IDbConnectionFactory
{
    
        Task<IDbConnection> CreateConnectionAsync();
     
}