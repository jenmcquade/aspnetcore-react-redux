import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import * as ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory'
import { createBrowserHistory } from 'history';
import { push } from 'react-router-redux'
import configureStore from './configureStore';
import { ApplicationState } from './store';
import * as StoreModule from './store';
import * as SearchState from './store/Search';
import * as AboutState from './store/About';
import Routes, { PropsType } from './components/Routes';
import { loadPolyfill } from './loadPolyfill';
import './dist/bootstrap.css';
import './sass/site.scss';
const readmePath = require("../../README.md");

function main() {

	// Get the application-wide store instance, prepopulating with state from the server where available.
	// Create browser history to use in the Redux store
	// const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
	const history = createHistory();
	const initialState = (window as any).initialReduxState as ApplicationState;
	// Get the application-wide store instance, prepopulating with state from the server where available.
	const store = configureStore(history, initialState);
	const searchActions = SearchState.actionCreators;
	const aboutActions = AboutState.actionCreators;
	const InlineScript = ({ script }) => <script dangerouslySetInnerHTML={{ __html: script }} />

	store.dispatch(searchActions.setAirportFromUrl(
		window.location.pathname, SearchState.actionCreators
	));

	store.dispatch(aboutActions.setAboutMarkDown({
    value: readmePath,
	}));

	const props = {
		...initialState,
		...SearchState.actionCreators,
		...AboutState.actionCreators,
		...store
	}

	function renderApp(store: any, history: any) {
		// This code starts up the React app when it runs in a browser. It sets up the routing configuration
		// and injects the app into a DOM element.
		ReactDOM.hydrate(
			<AppContainer>
				<Provider store={store}>
					<ConnectedRouter history={history}>
						<div id="App">
							<Routes {...props} />
							<InlineScript script={"window.initialReduxState = " + JSON.stringify(initialState)} />
						</div>
					</ConnectedRouter>
				</Provider>
			</AppContainer>,					 
			document.getElementById('react-app')
		);
	}

	renderApp(store, history);

	// Allow Hot Module Replacement
	if (module.hot) {
		module.hot.accept('./components/Routes', () => {
			renderApp(store, history);
		});
	}
}

main();
