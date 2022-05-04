using FluentValidation;
using TodoApi.modules.TodoModule.Models;

namespace TodoApi.modules.TodoModule.Validators;

public class NewListValidator : AbstractValidator<NewList>

{
    public NewListValidator()
    {
        RuleFor(list => list.Title).NotEmpty();
        RuleFor(list => list.Todos).NotEmpty();
    }
}