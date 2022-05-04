using System.Reflection;
using TodoApi.modules.MessageModule.Endpoints.Internal;

namespace TodoApi.Endpoints.Internal;

public static class EndpointExtensions
{
 // method twice for better api call
 
    public static void AddEndpoints<TMarker>(this IServiceCollection services,
        IConfiguration configuration)
    {
        // call addEndpoints below
        AddEndpoints(services, typeof(TMarker), configuration);
    }
    
  //method scans everything in the assmebly that implements the IEndpoints interface
    // then dynamically call DefineEndpoints and AddServices
    public static void AddEndpoints(this IServiceCollection services,
        Type typeMarker, IConfiguration configuration)
    {
        var endpointTypes = GetEndpointTypesFromAssemblyContaining(typeMarker);

        foreach (var endpointType in endpointTypes)
        {
            endpointType.GetMethod(nameof(IEndpoints.AddServices))!
                .Invoke(null, new object[] { services, configuration });
        }
    }

    public static void UseEndpoints<TMarker>(this IApplicationBuilder app)
    {
        UseEndpoints(app, typeof(TMarker));
    }

    public static void UseEndpoints(this IApplicationBuilder app, Type typeMarker)
    {
        var endpointTypes = GetEndpointTypesFromAssemblyContaining(typeMarker);

        foreach (var endpointType in endpointTypes)
        {
            endpointType.GetMethod(nameof(IEndpoints.DefineEndpoints))!
                .Invoke(null, new object[] { app });
        }
    }

    private static IEnumerable<TypeInfo> GetEndpointTypesFromAssemblyContaining(Type typeMarker)
    {
        var endpointTypes = typeMarker.Assembly.DefinedTypes
            .Where(x => !x.IsAbstract && !x.IsInterface &&
                        typeof(IEndpoints).IsAssignableFrom(x));
        return endpointTypes;
    }
}