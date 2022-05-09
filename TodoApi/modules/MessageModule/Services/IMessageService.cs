using TodoApi.modules.MessageModule.models;

namespace TodoApi.modules.MessageModule.Services;

public interface IMessageService
{
    public Task<Message> CreateAsync(NewMessage message);
    public Task<IEnumerable<Message>> GetAllMessages();

    public Task<Message> UpdateMessage(Message message);

    public Task<bool> DeleteMessage(int id);
}
