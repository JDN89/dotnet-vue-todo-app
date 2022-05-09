using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using TodoApi;
using TodoApi.Data;

namespace Todo.Api.Tests.Integration;

    public class TodoApiFactory : WebApplicationFactory<IApiMarker>
    {
      
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            // RIDER specific: set environment var in
            //TESTS > Unit Testing Settings > Test Runner > environment variables
            
            /*
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            if (env is null)
            {
                throw new Exception("parameter ASPENTCORE_ENV is empty");
            }
            */
/*
            builder.ConfigureServices(collection =>
            {
                
                collection.RemoveAll(typeof(IDbConnectionFactory));
                collection.AddSingleton<IDbConnectionFactory>(_ =>
                    new SqliteConnectionFactory("DataSource=file:inmem?mode=memory&cache=shared"));
            });
            */
            var env =  Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            builder.UseEnvironment(env);
        }
    
}