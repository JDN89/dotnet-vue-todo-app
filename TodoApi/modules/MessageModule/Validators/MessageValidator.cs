using FluentValidation;
using TodoApi.modules.MessageModule.models;

namespace TodoApi.modules.MessageModule.Validators;

public class MessageValidator : AbstractValidator<Message>
{
    public MessageValidator()
    {
        RuleFor(message => message.Body).NotEmpty();
        RuleFor(message => message.Id).NotEmpty();
        RuleFor(message => message.Title).NotEmpty();
    }
}