import * as React from 'react';
import * as SearchState from '../store/Search';

// At runtime, Redux will merge together...
type SearchProps =
    SearchState.SearchState     // ... state we've requested from the Redux store
    & typeof SearchState.actionCreators   // ... plus action creators we've requested

export default class About extends React.Component<SearchProps, SearchState.SearchState> {
    public render() {
        return <div className="msg-body">
            <div className="msg-wrapper">
                <div className="msg-inner">
                    <h1>Hello from Jon McQuade in Tacoma!</h1>
                    <p>This Single Page Application was built per the following guidelines:</p>
                    <ul>
                        <li>.Net 4.6 or higher</li>
                        <li>ASP.NET MVC Website</li>
                        <li>Twitter Bootstrap CSS</li>
                        <li>CSV Helper Nuget package for CSV processing</li>
                        <li>Expose necessary actions as JSON endpoints</li>
                        <li>Use a JavaScript library to encompass this functionality</li>
                    </ul>
                    <p>Required functionality</p>
                    <ul>
                        <li>User should be able to search for flights between different airports.</li>
                        <li>User should be able to see a list of flights matching the search parameters on the previous step</li>
                        <li>User should be able to sort the flights by price or departure</li>
                    </ul>
                    <p>Implementation</p>
                    <ul>
                        <li><a href='https://get.asp.net/'>ASP.NET Core</a> (Compatible with .NET 4.7) and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
                        <li><a href='https://facebook.github.io/react/'>React</a>, <a href='http://redux.js.org'>Redux</a>, and <a href='http://www.typescriptlang.org/'>TypeScript</a> for client-side code</li>
                        <li><a href='https://webpack.github.io/'>Webpack</a> for building and bundling client-side resources</li>
                        <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
                        <li><a href='https://docs.docker.com/engine/installation/'>Docker</a> for release management</li>
                    </ul>
                    <p>JSON API URLs are provided via Controllers/SearchDataController.cs</p>
                    <ul>
                        <li>See a list of available <a target="_blank" href="/api/Search/Airports">airports</a></li>
                        <li>Search for available flights from <a target="_blank" href="/api/Search/Flights?code=SEA">SeaTac</a></li>
                    </ul>
                    <p>To help you get started, I've also set up:</p>
                    <ul>
                        <li><strong>Client-side navigation</strong>. For example, click <em>Search by Airport</em> then <em>Back</em> to return here.</li>
                        <li><strong>Webpack dev middleware</strong>. In development mode, there's no need to run the <code>webpack</code> build tool. Your client-side resources are dynamically built on demand. Updates are available as soon as you modify any file.</li>
                        <li><strong>Hot module replacement</strong>. In development mode, you don't even need to reload the page after making most changes. Within seconds of saving changes to files, rebuilt React components will be injected directly into your running application, preserving its live state.</li>
                        <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and the <code>webpack</code> build tool produces minified static CSS and JavaScript files.</li>
                        <li><strong>Server-side prerendering</strong>. To optimize startup time, your React application is first rendered on the server. The initial HTML and state is then transferred to the browser, where client-side code picks up where the server left off.</li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
