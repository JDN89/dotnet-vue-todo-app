using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers.Cache;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Logging;
using TodoApi;
using TodoApi.modules.MessageModule.models;
using Xunit;
using Xunit.Sdk;

namespace Todo.Api.Tests.Integration;

// access httpclient
// WebApplicationFactory access a full fledged api
// this api can't be called  through the web, only via httpclient
// in memory api perfect for testing
public class TodoApiEndpointsTests : IClassFixture<TodoApiFactory>, IAsyncLifetime
{
    private readonly TodoApiFactory _factory;
    private readonly List<NewMessage> _createMessage = new();

    public TodoApiEndpointsTests(TodoApiFactory factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task Create_CreateMessage_WhenDataIsCorrect()
    {
//Arrange
        var httpClient = _factory.CreateClient();

        var message = GenerateMessage();
//Act
        var result = await httpClient.PostAsJsonAsync("api/", message);
        
        _createMessage.Add(message);
        var createdMessage = await result.Content.ReadFromJsonAsync<Message>();
//Assert
        result.StatusCode.Should().Be(HttpStatusCode.Created);
        createdMessage.Should().BeEquivalentTo(message);
        result.Headers.Location.Should().Be($"api/");
    }


    [Fact]
    public async Task CreateMessage_Fails_WhenTitleISInvalid()
    {
//Arrange
        var httpClient = _factory.CreateClient();

        var message = GenerateMessage();
        message.Title = "";
//Act
        var result = await httpClient.PostAsJsonAsync("api/", message);
        _createMessage.Add(message);
        var errors = await result.Content.ReadFromJsonAsync<IEnumerable<ValidationError>>();
        var error = errors!.Single();

//Assert
        result.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        error.PropertyName.Should().Be("Title");
        error.ErrorMessage.Should().Be("'Title' must not be empty.");
    }

    private NewMessage GenerateMessage(string title = "test title", string body = "test body")
    {
        return new NewMessage
        {
            Title = title,
            Body = body
        };
    }

    public Task InitializeAsync() => Task.CompletedTask;

    public Task DisposeAsync() => Task.CompletedTask;

}