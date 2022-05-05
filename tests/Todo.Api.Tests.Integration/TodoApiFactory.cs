using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using TodoApi;

namespace Todo.Api.Tests.Integration;

public class TodoApiFactory
{
    public class LibraryApiFactory : WebApplicationFactory<IApiMarker>
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            // RIDER specific: set environment var in
            //TESTS > Unit Testing Settings > Test Runner > environment variables
           var env =  Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            builder.UseEnvironment(env);

        }
    }
}