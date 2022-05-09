using Dapper;
using TodoApi.Data;
using TodoApi.modules.MessageModule.models;

namespace TodoApi.Services;

public class MessageService: IMessageService
{
    private readonly IDbConnectionFactory _connectionFactory;

    public MessageService(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<Message> CreateAsync(NewMessage message)
    {
        using var connection = await _connectionFactory.CreateConnectionAsync();
        return await connection.QuerySingleAsync<Message>(
            "INSERT INTO messages (title, body) VALUES (@Title, @Body) RETURNING * ", message);
    }
}