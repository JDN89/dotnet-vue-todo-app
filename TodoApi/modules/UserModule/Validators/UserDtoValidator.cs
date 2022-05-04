using FluentValidation;
using TodoApi.modules.UserModule.Dto;

namespace TodoApi.modules.UserModule.Validators;

public class UserDtoValidator: AbstractValidator<UserDto>
{
    public UserDtoValidator()
    {
        RuleFor(user => user.Email).NotEmpty().EmailAddress();
        RuleFor(user => user.PassWord).NotEmpty().NotNull();
    } 
}