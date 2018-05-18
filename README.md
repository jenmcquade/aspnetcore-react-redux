# **`aspnetcore-react-redux`**
## ASP.NET Core 2 MVC SPA boilerplate with JSON entpoints
### Hello from Jon in Tacoma, the toe of *SEA_TAC*, Zip \*\*404

***

<img class="tacoma" src='https://upload.wikimedia.org/wikipedia/commons/e/ee/Tacoma_Dome.jpg' alt="Tacoma Dome" />
<h4 align=center>#WeBuildThingsHere</h4>

***

## Docker Tags
https://hub.docker.com/r/jonmcquade/aspnetcore-react-redux/tags/
* :dev builds have all the tools needed to debug and build your projects
* :latest builds are production builds used by Heroku for http://dotnetcore-flightsearch.herokuapp.com/

## YouTube Guides (In Progress)

[![Installation Guide](https://img.youtube.com/vi/kUePoOVKkbU/0.jpg)](https://www.youtube.com/watch?v=kUePoOVKkbU&t=1s&list=PL2GeakHgUYU8vf59dJ50zjPq6gbV9C27R&index=1)

## Table of Contents
* [About this Template](#about)
* [Project history](#history)
* [What's in the box?](#tools)
* [Up and Running using Docker](#quickstart)
* [Up and Running without Docker](#local-no-docker)
* [Why use the Preview release of Visual Studio](#using-vs-preview)
* [Software requirements when not using Docker](#local-no-docker-requirements)
* [CLR commands for running without Visual Studio or Docker](#commands)

<a name="about"></a>
## About this ASP .NET Core 2 SPA Template
### This project builds from the `src` directory.
* *Dockerized Boilerplate* for *C# ASP .NET Core 2.1 MVC SPA* development, with Isomorphic React and Redux server and client-side rendering of React Components.
* Develop, debug, build, publish and release **.NET Core 2.1 ASP .NET** apps without installing .NET locally, using pre-built Docker images running Linux Alpine.  
* This `README.md` file is dynamically loaded into the `src/ClientApp/components/About` component as a demonstration of a simple no-db CMS. When debugging locally in Development, you can access this same README within the app at **http://localhost:5000/about**.  Using `docker-compose -f docker-compose.dev.yml up` in the root directory, it can be accessed at **http://localhost:8080/about**.
* **Library dependencies** are the freshest versions as of 3/13/2018, including *Microsoft .NET Core Runtime 2.1.0 Preview1* and *aspnetcore2.1* targeting, with up-to-date and alpha *package.json* references.
* **API and microservices examples**: Demonstration of *CSV* to *ASP.NET Controller* conversion, with JSON API for file I/O, seperate from the UI.  
* Demonstration of isomorphic design using ASP .NET Prerendering of React, Redux and React Router
* **Bootstrap 4** and **Webpack 4** compatible frontend with **React Hot Module Replacement** when running locally.  State is maintained between routes, inside of the Redux store.  **HMR using Docker is not yet resolved: file changes do not trigger a Webpack build.**
* **ActionScript** is moderately implemented, as to not scare off junior developers.

<a name="history"></a>
### Project History
* **V1** (implementing *.NET Core SDK 1*) was developed in August 2017.  **V2** (implementing *.NET Core SDK 2*) was developed in March, 2018.  

<a name="tools"></a>
## What's in the box?
* [ASP.NET Core 2.1.* SDK](https://get.asp.net/) implemented using [C# for cross-platform server-side code](https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx)
* [CsvHelper Nuget Package](https://www.nuget.org/packages/CsvHelper) for loading CSV file resources using disk I/O and converting to JSON
* [React](https://facebook.github.io/react/), [Redux](http://redux.js.org), and  [TypeScript for client-side code](http://www.typescriptlang.org)
* [React Router](https://github.com/ReactTraining/react-router) and [React Router Redux](https://github.com/reactjs/react-router-redux), for routing with State Management
* [AspNet-Webpack Middleware](https://www.npmjs.com/package/aspnet-webpack) and  [Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/), for auto-reloading of saved resources in development
* [Webpack 4](https://webpack.github.io) for building and bundling client-side resources
* [Font Awesome](https://fontawesome.com) for font imports
* [Bootstrap 4](http://getbootstrap.com/)  for layout and styling
* [Sass](https://sass-lang.com/install]) to transpile vendor and this app's CSS
* [Docker](https://docs.docker.com/engine/installation/) for release management and local debugging.  **Linux containers are used with this project.** If you are using Windows containers with Docker for Windows, right click on the Docker Context Menu in the Start Menu, and select *Switch to Linux Containers...*  
* Environment configurations for *Production* and *Development*, including configurations for `dotnet restore`, `dotnet build` and `dotnet publish` both locally and through Docker.  Distribution bundles are handled independently, allowing you to build a Debug or a Release .dll or standalone app, with dynamic hosting configurations included for Heroku port management.

<a name="quickstart"></a>
## Up and Running using Docker
***
##### **The easiest way to get started** is to install `docker` on your machine.  Once installed, run this `command` inside of the project's **root (.)** directory:<br>
* `docker-compose -f docker-compose.dev.yml up`
* This will download the latest (:dev) build and create a container. `npm install`, as well as `webpack` packaging are initiated automatically before the server starts.

##### When initial site caching has completed, open `http://localhost:8080` in your browser.

#### What happens when I run this?
* *Docker Compose* is configured to pull a Dockerhub image to your machine named  **`jonmcquade/aspnetcore-react-redux`** with the **`:dev`** tag. 
* You can also build your own version of the image using `docker-compose -f docker-compose.dev.yml build` in the project root (.) directory. 
* Docker Compose passes build arguments to the *Dockerfile* build configuration to create a (:dev) tagged image.  `dotnet restore` is run during the build to pull down project dependencies.  When the container runs, the entrypoint script is executed, then runs `npm install` and `webpack` commands inside the container to generate static site files.
* Docker Compose runs the image in a **container**, mapping the host's `8080` port to the container's `3000` port.
* The host's `./src` folder is mapped to the container's `/dotnetcorespa` directory using shared volumes.   
* The Development build contains **WebPack middleware** to initiate **Hot Module Replacement** in most project files.  As you save `ClientApp` files, *Webpack* will rebundle and inject the updates to the DOM without a need to refresh the page. **This is currently broken using Docker but works when debugging locally (Runtime and SDK installed on host machine)**

#### Docker: To run a Production build and publish a self-contained executable
* [Install Docker](https://docs.docker.com/install/]https://docs.docker.com/install)
* Run the `command` below in the project (".") directory to publish a Production build of your app:
* `docker-compose build`
* The `Dockerfile` builds a base image of **`jonmcquade/aspnetcore-react-redux`** with a tag of **`latest`**.  This image is much smaller than the **`:dev`** tag because it does not include the *.NET Core 2 SDK*. A standalone *Production* build only requires the *.NET Core 2 Runtime Dependency libraries*.

***
### Note
*`docker-compose -f docker-compose.dev.yml up`* creates a container named **aspnetcore-react-redux-dev**.  You can run `docker exec -ti aspnetcore-react-redux-dev shell` to enter an interactive terminal into the running *Docker Container* that *Docker Compose* started.  This way, you can run your shell commands directly in the Docker container, without needing to wrap your commands in the docker clr from your host.
*** 

<a name="local-no-docker"></a>
## To develop locally without using Docker
###### This app targets the **.NET Core 2.1 Runtime**.  This was decided as a requirement due to the recent release of *.NET Core 2.1 SDK* and Runtimes using Docker images under **Linux Alpine** with an **AMD 64-bit CPU**. *Linux Apline* produces much smaller builds, which is perfect for microservice and SPA development.

<a name="local-no-docker-requirements"></a>
#### Requirements for local development
* [NodeJS 8.11](https://nodejs.org/en/download/) with NPM 5.6
* [Webpack 4](https://webpack.js.org/)
* **For editing files**: **[Visual Studio 2017 Preview](https://www.visualstudio.com/vs/preview)** and also **[VS Code](https://code.visualstudio.com)** are free to download. I typically use VS Code for frontend development and VS Community for ASP .NET development.  These are just suggestions.
* **Debugging/Building within IDE** [Visual Studio 2017 Preview](https://www.visualstudio.com/vs/preview) with **"ASP.NET and web development"** selected in the Visual Studio Installer.
* [.NET Core 2 SDK 2.1.300-preview1-008174](https://www.microsoft.com/net/download/dotnet-core/sdk-2.1.300-preview1)
You will need the latest SDK version. This is the version being used in Docker. 
* [.NET Runtime 2.1.0-preview1 ](https://www.microsoft.com/net/download/dotnet-core/runtime-2.1.0-preview1) which is included with the .NET Core 2.1.300-preview1 SDK.  **You don't need to download this if installing the SDK.** The runtime is packaged with the SDK. This is the version being used in Docker.

***
### Note
You don't have to debug or build from the Visual Studio IDE.  The `dotnet` CLR is installed with the .NET SDK, which allows you to run `dotnet build` and `dotnet publish` commands.
***

<a name="using-vs-preview">

<a name="commands"></a>

### Commands

#### For Development 
* `npm install` from the `src` directory will run a dotnet restore as well as run webpack to create all required file resources.
* `npm start` from the `src` directory will start a local instance of the Web app

#### For Building and Publishing
* Run `dotnet build -c Release -o ./app` to build the .NET libraries.  This does not run `npm install` or `webpack` operations.
* Run `dotnet publish -c Release -o ./app` to publish to the *./app* directory.  This performs `npm install` and `webpack` operations for you. 

##### The application will be available http://localhost:5000 

#### Why the Preview release of Visual Studio?

* The Preview version includes the ability to **target** the *.NET Core 2.1 SDK and Runtime* from within the IDE.  **However, you'll still need to install a newer version of the SDK in order to debug or build**. Depending on your version of Visual Studio, you might not be able to target `.NET Core 2.1 Runtime` inside the IDE yet.  In addition to targeting the framework, the framework must be installed locally when not using Docker.    
* You can modify the `global.json` and `flightsearch.csproj` project files to target a previous version of the .NET Core 2 runtime, such as the more-supported 2.0.  2.1 is a project requirement for Docker support, not for running or building locally.  Changing the runtime version can cause undesired affects, has not been tested, and won't be supported at this time.
* You can also run a build from within Visual Studio using the Build and Debug menus. Due to some .NET Core 2.1 features still existing in Preview releases, you may see errors in the IDE console/output window about not being able to target the `.NET Core 2.1` runtime.  **Visual Studio 2017 Preview** has resolved issues with targeting the .NET Core 2.1 runtime. 


