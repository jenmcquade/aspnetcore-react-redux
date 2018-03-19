import * as React from 'react';
import { Router, Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Airport from './components/Airport';
import Filter from './components/Filter';
import About from './components/About';

export default <Route components={ Layout }>
    <Route path='/' components={{ body: Home }} />
    <Route path='/airport' components={{ body: Airport }} />
    <Route path='/filter' components={{ body: Filter }}>
        <Route path='(:airportCode)'> 
            <Route path='(:sortBy)'/>
        </Route>
    </Route>
    <Route path='/about' components={{ body: About }} />
</Route>;

// Enable Hot Module Replacement (HMR)
if (module.hot) {
    module.hot.accept();
}
