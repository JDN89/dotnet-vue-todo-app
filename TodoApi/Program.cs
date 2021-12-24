using Dapper;
using Npgsql;
using System.ComponentModel.DataAnnotations;
using Carter;


var builder = WebApplication.CreateBuilder(args);

var connectionString = "User ID=jan; Password=9450; Host=localhost; Port=5432; Database=tododb; Pooling=true;";

builder.Services.AddScoped(_ => new NpgsqlConnection(connectionString));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
// builder.Services.AddHttpLogging(logging =>
//     {
//         // Customize HTTP logging here.
//         logging.LoggingFields = Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.ResponseBody;
//         logging.LoggingFields = Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.RequestBody;
//         logging.LoggingFields = Microsoft.AspNetCore.HttpLogging.HttpLoggingFields.Request;

//         logging.RequestHeaders.Add("My-Request-Header");
//         logging.ResponseHeaders.Add("My-Response-Header");
//         logging.MediaTypeOptions.AddText("application/javascript");

//         logging.RequestBodyLogLimit = 4096;
//         logging.ResponseBodyLogLimit = 4096;
//     });

builder.Services.AddCarter();

var app = builder.Build();


await EnsureDb(app.Services, app.Logger);


if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");

}
if (app.Environment.IsDevelopment())
{
    // PLAATS HIER JE CORS SETTINGS
    app.UseDeveloperExceptionPage();
    app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());


}
// DO I NEED TO USE ROUTING AND ENDPOINTS EXTENSIONS WITH DAPPER/
// app.UseRouting();


// app.UseEndpoints(endpoints =>
// {
//     endpoints.MapDefaultControllerRoute();
// });

// app.UseSpaStaticFiles();s

app.MapGet("/error", () => Results.Problem("An error occurred.", statusCode: 500))
   .ExcludeFromDescription();

app.MapSwagger();
app.UseSwaggerUI();
app.MapCarter();
// app.UseHttpLogging();



//  app.Use(async (context, next) =>
//     {
//         await next();
//         if (context.Response.StatusCode == 404)
//         {
//             context.Request.Path = "/Home";
//             await next();
//         }
//     });

// app.UseSpa(builder =>
// {
//     if (app.Environment.IsDevelopment())
//     {
//         builder.UseProxyToSpaDevelopmentServer("http://localhost:4000/");
//     }

// });


app.Run();


async Task EnsureDb(IServiceProvider services, ILogger logger)
{
    logger.LogInformation("Ensuring database exists at connection string '{connectionString}'", connectionString);

    await using var db = services.CreateScope().ServiceProvider.GetRequiredService<NpgsqlConnection>();

}

