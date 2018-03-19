require('./sass/site.scss');
import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import routes from './routes';
import Layout from './components/Layout';
import configureStore from './configureStore';
import { ApplicationState } from './store';
import createHistory from 'history/createBrowserHistory';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window as any).initialReduxState as ApplicationState;
const store = configureStore(initialState);
const history = createHistory();

const mountDiv = document.getElementById('react-app');

// This code starts up the React app when it runs in a browser. It sets up the routing configuration
// and injects the app into a DOM element
const render = (Component) => {
    ReactDOM.render(
        <Provider store={ store }>
            <ConnectedRouter history={history}>
                <AppContainer>
                    <Component store={store} router={history} />
                </AppContainer>
            </ConnectedRouter>
        </Provider>,
        mountDiv
    );
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./App', () => {
        render(App);
    });
}

registerServiceWorker();