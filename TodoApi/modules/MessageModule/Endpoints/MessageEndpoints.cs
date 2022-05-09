using FluentValidation;
using Microsoft.IdentityModel.Tokens;
using TodoApi.modules.MessageModule.Endpoints.Internal;
using TodoApi.modules.MessageModule.models;
using TodoApi.modules.MessageModule.Services;
using TodoApi.Services;

namespace TodoApi.modules.MessageModule.Endpoints;

public class MessageEndpoints : IEndpoints
{
    private const string ContentType = "application/json";
    private const string Tag = "Messages";

    public static void DefineEndpoints(IEndpointRouteBuilder app)
    {
        app.MapPost("api/", CreateMessageAsync)
            .WithName("CreateMessage")
            .Accepts<NewMessage>(ContentType)
            .Produces<Message>(201).Produces<IEnumerable<ValidationFailure>>(400)
            .WithTags(Tag)
            .AllowAnonymous();


        app.MapGet("api/", GetAllMessagesAsync)
            .WithName("GetMessages")
            .Produces<IEnumerable<Message>>(200)
            .WithTags(Tag)
            .AllowAnonymous();

        app.MapPut("api/", UpdateMessage)
            .WithName("UpdateMessage")
            .Produces<Message>(201).Produces<IEnumerable<ValidationFailure>>(400)
            .WithTags(Tag)
            .AllowAnonymous();

        app.MapDelete("api/", DeleteMessage)
            .WithName("DeleteMessage")
            .Produces(204).Produces(404)
            .WithTags(Tag)
            .AllowAnonymous();
    }

    internal static async Task<IResult> CreateMessageAsync(
        NewMessage message, IMessageService messageService, IValidator<NewMessage> validator)
    {
        var validationResult = await validator.ValidateAsync(message);
        if (!validationResult.IsValid)
        {
            return Results.BadRequest(validationResult.Errors);
        }

        var createdMessage = await messageService.CreateAsync(message);

        return Results.Created("api/", createdMessage);
    }

    internal static async Task<IResult> GetAllMessagesAsync(
        IMessageService messageService)
    {
        var messages = await messageService.GetAllMessages();
        return Results.Ok(messages);
    }


    internal static async Task<IResult> UpdateMessage(Message updateMessage,
        IMessageService messageService, IValidator<Message> validator)
    {
        var validationResult = await validator.ValidateAsync(updateMessage);
        if (!validationResult.IsValid)
        {
            return Results.BadRequest(validationResult.Errors);
        }

        var updated = await messageService.UpdateMessage(updateMessage);

        return Results.Created("api/", updated);
    }


    internal static async Task<IResult> DeleteMessage(int id,
        IMessageService messageService)
    {
        var deleted = await messageService.DeleteMessage(id);
        return deleted
            ? Results.NoContent()
            : Results.NotFound();
    }

    // ======================================    
    // insert Services to which you offload extra logic here
    // ===========================================
    public static void AddServices(IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<IMessageService, MessageService>();
    }
}
