using FluentValidation;
using TodoApi.modules.MessageModule.models;

namespace TodoApi.modules.MessageModule.Validators;

public class NewMessageValidator : AbstractValidator<NewMessage>
{
    public NewMessageValidator()
    {
        RuleFor(message => message.Body).NotEmpty();
        RuleFor(message => message.Title).NotEmpty();
    }
}