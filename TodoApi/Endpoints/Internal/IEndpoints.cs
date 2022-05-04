namespace TodoApi.modules.MessageModule.Endpoints.Internal;

public interface IEndpoints
{
   // add following to csproj to enable underlying experimental featurs
   //    <EnablePreviewFeatures>True</EnablePreviewFeatures>
   // <NoWarn>CA225</NoWarn>
   public static abstract void DefineEndpoints(IEndpointRouteBuilder app);

   public static abstract void AddServices(IServiceCollection services, IConfiguration configuration);
}