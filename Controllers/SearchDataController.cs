/**
 * 
 * FILE: SearchDatacontroller.cs
 * Provides JSON output of App_Data Airport and Flight data
 * 
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using CsvHelper;


namespace alaska.Controllers
{

    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        IHostingEnvironment _env;

        /*
         * Constructor and IHostingEnvironment is required for ASP.NET Core to get the App_Data contents
         */
        public SearchController(IHostingEnvironment env)
        {
            _env = env;
        }

        /*
         * Return Json results of airports.csv
         */
        [HttpGet("[action]")]
        public JsonResult Airports()
        {
            using (TextReader reader = System.IO.File.OpenText(_env.ContentRootPath + @"\App_Data\airports.csv"))
            {
                var csv = new CsvReader(reader);
                var records = csv.GetRecords<Airport>().ToList();
                return Json(records);
            }

        }

        /*
         * Return Json results of flights.csv based on airport code
         */
        [HttpGet("[action]")]
        public JsonResult Flights()
        {
            var queryStrings = Request.Query;
            var airportCode = queryStrings["code"];
            var sortType = queryStrings["sort"];
            using (TextReader reader = System.IO.File.OpenText(_env.ContentRootPath + @"\App_Data\flights.csv"))
            {
                var csv = new CsvReader(reader);
                List<Flight> searchList = new List<Flight>();
                // If we didn't receive an airport code, return the full flight list
                if (!Request.Query.ContainsKey("code") || airportCode == "ALL")
                {
                    searchList = csv.GetRecords<Flight>().ToList();
                }
                else
                {
                    // Compile a list of flights based on 
                    while (csv.Read())
                    {
                        var fromField = csv.GetField<string>("From");
                        if (fromField == airportCode)
                        {
                            searchList.Add(csv.GetRecord<Flight>());
                        }
                    }
                }

                // Sort operations
                // This shows calling the Sort(Comparison(T) overload using 
                // an anonymous method for the Comparison delegate. 
                // This method treats null as the lesser of two values.
                searchList.Sort(delegate (Flight x, Flight y)
                {
                    switch (sortType)
                    {
                        case "cabinPrice":
                            return x.MainCabinPrice.CompareTo(y.MainCabinPrice);
                        case "flightNumber":
                            return x.FlightNumber.CompareTo(y.FlightNumber);
                        default:
                            return x.Departs.CompareTo(y.Departs);
                    }
                });
                return Json(searchList);
            }

        }

        public class Airport
        {
            public string Code { get; set; }
            public string Name { get; set; }
        }

        public class Flight
        {
            public string From { get; set; }
            public string To { get; set; }
            public decimal FlightNumber { get; set; }
            public DateTime Departs { get; set; }
            public DateTime Arrives { get; set; }
            public decimal MainCabinPrice { get; set; }
            public decimal FirstClassPrice { get; set; }
        }

    }
}
