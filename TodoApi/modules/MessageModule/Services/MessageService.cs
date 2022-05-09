using Dapper;
using TodoApi.Data;
using TodoApi.modules.MessageModule.models;
using TodoApi.modules.MessageModule.Services;

namespace TodoApi.Services;

public class MessageService : IMessageService
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


    public async Task<IEnumerable<Message>> GetAllMessages()
    {

        using var connection = await _connectionFactory.CreateConnectionAsync();
        return await connection.QueryAsync<Message>("SELECT * FROM messages");
    }

    public async Task<Message> UpdateMessage(Message message)
    {

        using var connection = await _connectionFactory.CreateConnectionAsync();
        return await connection.QuerySingleAsync<Message>(
                    "UPDATE messages SET title = @Title, body = @Body WHERE id = @Id RETURNING *", message);


    }

    public async Task<bool> DeleteMessage(int id)
    {

        using var connection = await _connectionFactory.CreateConnectionAsync();


        return await connection.ExecuteAsync(
            "DELETE FROM messages WHERE id = @id", new { id }) == 1;

    }
}
