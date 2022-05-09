using TodoApi.modules.MessageModule.models;

namespace TodoApi.Services;

public interface IMessageService
{
 public Task<Message> CreateAsync(NewMessage message);
}