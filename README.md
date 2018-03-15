# aspnetcore-react-redux
Template for C# ASP .NET Core SPA with React and Redux
This project builds from this (".") directory.

## Up and Running

### Requirements: 
* NodeJS
* Webpack
* Visual Studio 2017 with "ASP.NET and web development" selected in the VS installer

### To run using Dotnet Core tools:
Inside the aspnetcore-react-redux directory<br>
`$ dotnet restore`<br>
`$ npm install`<br>
`$ webpack --config="webpack.config.vendor"`<br>
`$ webpack`<br>
`$ dotnet run`

You can also run a build from within Visual Studio using the Build menu. However, you will still need to manually run NPM and Webpack commands in order to generate the site files for the SPA (see above commands).

The application will be available http://localhost:5000

### If you see ...
"Error. An error occurred while processing your request." ...
Then webpack needs to be run inside of the main project directory, to generate the CSS and JS files. This is a NodeJS error, not a C#/.NET error.

## About this App

Hello from Jon in Tacoma! This Single Page Application was built per the following guidelines: 

* .Net 4.6 or higher
* ASP.NET MVC Website
* Twitter Bootstrap CSS
* CSV Helper Nuget package for CSV processing
* Expose necessary actions as JSON endpoints
* Use a JavaScript library to encompass this functionality

### Required functionality

* User should be able to search for flights between different airports.
* User should be able to see a list of flights matching the search parameters on the previous step
* User should be able to sort the flights by price or departure

### Implementation

* ASP.NET Core (Compatible with .NET 4.7) and C# for cross-platform server-side code
* React, Redux, and TypeScript for client-side code
* Webpack for building and bundling client-side resources
* Bootstrap for layout and styling
* Docker for release management
* JSON API URLs are provided via Controllers/SearchDataController.cs

### To help you get started, I've also set up:

* Client-side navigation. For example, click Search by Airport then Back to return here.
* Webpack dev middleware. In development mode, there's no need to run the webpack build tool. Your client-side resources are dynamically built on demand. Updates are available as soon as you modify any file.
* Hot module replacement. In development mode, you don't even need to reload the page after making most changes. Within seconds of saving changes to files, rebuilt React components will be injected directly into your running application, preserving its live state.
* Efficient production builds. In production mode, development-time features are disabled, and the webpack build tool produces minified static CSS and JavaScript files.
* Server-side prerendering. To optimize startup time, your React application is first rendered on the server. The initial HTML and state is then transferred to the browser, where client-side code picks up where the server left off.
