import * as React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as SearchState from '../store/Search';

// At runtime, Redux will merge together...
type SearchProps =
    SearchState.SearchState     // ... state we've requested from the Redux store
    & typeof SearchState.actionCreators   // ... plus action creators we've requested

export default class Home extends React.Component<SearchProps, SearchState.SearchState> {
    public render() {
        return <div className="msg-body">
            <div className="msg-wrapper">
                <div className="msg-inner">
                    <h1>Find Your Connection</h1>
                    <Link className='btn btn-lg btn-primary' to={'/airport'}>Begin Search</Link>
                </div>
            </div>
        </div>;
    }
}
