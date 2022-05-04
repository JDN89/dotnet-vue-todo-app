using FluentValidation;
using TodoApi.modules.TodoModule.Models;

namespace TodoApi.modules.TodoModule.Validators;

public class ArchiveTodoValidator : AbstractValidator<ArchiveTodo>
{
    public ArchiveTodoValidator()
    {
        RuleFor(todo => todo.Todo).NotEmpty();
        RuleFor(todo => todo.ListId).NotEmpty();
    }
}