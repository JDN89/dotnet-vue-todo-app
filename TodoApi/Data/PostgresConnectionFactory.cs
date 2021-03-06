using System.Data;
using Npgsql;

namespace TodoApi.Data;

public class PostgresConnectionFactory: IDbConnectionFactory
{
    private readonly string _connectionString;

    public PostgresConnectionFactory(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<IDbConnection> CreateConnectionAsync()
    {
        var connection = new NpgsqlConnection(_connectionString);
        Console.WriteLine("fire");
        await connection.OpenAsync();
        return connection;
    }
}