import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Route } from 'react-router';
import { StaticRouter, RouteComponentProps } from 'react-router-dom';
import { replace } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import { createMemoryHistory } from 'history';
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';
import { fetch, addTask } from 'domain-task';
import Routes, { PropsType } from './components/Routes';
import configureStore from './configureStore';
import * as StateModule from './store';
import { ApplicationState } from './store';
import { AppThunkAction } from './store';
import * as SearchState from './store/Search';
import * as AboutState from './store/About';
import './sass/site.scss';
import './favicon.ico';
const readmePath = require("../../README.md");

export default createServerRenderer(params => {
	return new Promise<RenderResult>((resolve, reject) => {
		console.log(`Node server: url = ${params.url}, origin=${params.origin}, baseUrl=${params.baseUrl}`);
		const store = configureStore(createMemoryHistory());
		const state = store.getState();
		const searchActions = SearchState.actionCreators;
		const aboutActions = AboutState.actionCreators;
		
		// Prepare Redux store with in-memory history, and dispatch a navigation event
		// corresponding to the incoming URL
		const basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash
		const urlAfterBasename = params.url.substring(basename.length);
		const props = {
			...state,
			...SearchState.actionCreators,
			...AboutState.actionCreators,
			...store,
		}
		const InlineScript = ({ script }) => <script dangerouslySetInnerHTML={{ __html: script }} />

		store.dispatch(replace(urlAfterBasename));															 
		store.dispatch(searchActions.requestAirports());
		store.dispatch(searchActions.setAirportFromUrl(
			urlAfterBasename, SearchState.actionCreators
		));
		store.dispatch(aboutActions.setAboutMarkDown({
			value: readmePath,
		}));

		// Prepare an instance of the application and perform an inital render that will
		// cause any async tasks (e.g., data access) to begin
		const routerContext: any = {};
		const App: any = () => (
			<AppContainer>
				<Provider store={store}>
					<StaticRouter context={routerContext} location={params.location}>
						<div id="App">
							<Routes {...props} />
							<InlineScript script={"window.initialReduxState = " + JSON.stringify(store.getState())} />
						</div>
					</StaticRouter>
					</Provider>
			</AppContainer>
		);

		renderToString(<App />);

		// If there's a redirection, just send this information back to the host application
		if (routerContext.url) {
			resolve({
				redirectUrl: routerContext.url,
				statusCode: routerContext.status
			});
			return;
		}

		// Once any async tasks are done, we can perform the final render
		// We also send the redux store state, so the client can continue execution where the server left off
		params.domainTasks.then(() => {
			if (!routerContext.url) { // && (!routerContext.status || (routerContext.status >= 200 && routerContext.status < 300)))
				const appString = renderToString(
					<div id="react-app">
						<App />
					</div>
				);

				resolve({
					html: appString,
					statusCode: routerContext.status
				});
			} else {
				resolve({
					redirectUrl: routerContext.url,
					statusCode: routerContext.status
				});
			}
		}, reject); // Also propagate any errors back into the host application
	});
});