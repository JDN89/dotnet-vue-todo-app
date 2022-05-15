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
            // remove the existing IDbConnectionFactory from builder.services
           // add a second postgress (or another db) where you store the test data 
            builder.ConfigureServices(collection =>
            {

                collection.RemoveAll(typeof(IDbConnectionFactory));
                collection.AddSingleton<IDbConnectionFactory>(_ =>
                    new PostgresConnectionFactory("User ID=jan; Password=9450; Host=localhost; Port=5432; Database=todo-test-db; Pooling=true;"));

            });
            
        }
        

    
}