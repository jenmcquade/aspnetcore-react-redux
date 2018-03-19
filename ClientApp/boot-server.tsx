import * as React from 'react';

import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, StaticRouter } from 'react-router';
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';
import { ConnectedRouter } from 'react-router-redux'
import routes from './routes';
import configureStore from './configureStore';

const ReactRouter = require('react-router');
const routerMatch = ReactRouter.match;

export default createServerRenderer(params => {
    return new Promise<RenderResult>((resolve, reject) => {
        // Match the incoming request against the list of client-side routes
        const store = configureStore();
        routerMatch({ routes, location: params.location }, (error, redirectLocation, renderProps: any) => {
            if (error) {
                throw error;
            }

            // If there's a redirection, just send this information back to the host application
            if (redirectLocation) {
                resolve({ redirectUrl: redirectLocation.pathname });
                return;
            }

            // If it didn't match any route, renderProps will be undefined
            if (!renderProps) {
                throw new Error(`The location '${ params.url }' doesn't match any route configured in react-router.`);
            }

            // Build an instance of the application
            const app = (
                <Provider store={ store }>
                    <StaticRouter {...renderProps} />
                </Provider>
            );

            // Perform an initial render that will cause any async tasks (e.g., data access) to begin
            renderToString(app);

            // Once the tasks are done, we can perform the final render
            // We also send the redux store state, so the client can continue execution where the server left off
            params.domainTasks.then(() => {
                resolve({
                    html: renderToString(app),
                    globals: { initialReduxState: store.getState() }
                });
            }, reject); // Also propagate any errors back into the host application
        });
    });
});
