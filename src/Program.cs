using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace flightsearch
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";
            string port = Environment.GetEnvironmentVariable("PORT") ?? "3000";
            string sslPort = Environment.GetEnvironmentVariable("SSL_PORT") ?? "3001";
			int portId = Convert.ToInt32(port);
			int sslPortId = Convert.ToInt32(sslPort);

			var isDevelopment = environment == EnvironmentName.Development;
            var host = new WebHostBuilder()
                .UseKestrel(options =>
                {
                    options.Listen(IPAddress.Any, portId);
                    options.Listen(IPAddress.Any, sslPortId);  
                })
                .UseUrls("http://*:" + port, "https://*:" + sslPort) // <----- This will fix "Err Empty Response"
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseEnvironment(environment)
                .UseStartup<Startup>()
                .Build();
            host.Run();
        }

    }
}