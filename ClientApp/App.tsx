import * as React from 'react';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import configureStore from './configureStore';
import { ApplicationState } from './store';
import * as SearchState from './store/Search';
import createHistory from 'history/createBrowserHistory';
import Layout from './components/Layout';
import { connect } from 'react-redux';

// At runtime, Redux will merge together...
type SearchProps =
    SearchState.SearchState     // ... state we've requested from the Redux store
    & typeof SearchState.actionCreators   // ... plus action creators we've requested

class App extends React.Component<SearchProps, SearchState.SearchState> {
    public constructor(SearchProps) {
        super(SearchProps)
        this.state = {
            ...SearchProps
        };
        SearchProps.requestAirports();
        this.setAirportFromUrl(SearchProps);
    }

    public componentWillReceiveProps(nextProps) {
        this.setAirportFromUrl(nextProps);
    }

    public setAirportFromUrl(props) {
        let location = props.router.location.pathname;
        let airportCode = location.split('/filter/')[1] ? location.split('/filter/')[1] : "ALL";
        for(let ap in props.airports) {
            if(props.airports[ap].code === airportCode) {
                props.setAirport({ code: props.airports[ap].code, name: props.airports[ap].name });
            }
        }
    }

    public render() {
        return <BrowserRouter><Layout {...this.props} /></BrowserRouter>
    }
}

export default connect(
    (state: ApplicationState) => state.search, // Selects which state properties are merged into the component's props
    SearchState.actionCreators                 // Selects which action creators are merged into the component's props
)(App);
