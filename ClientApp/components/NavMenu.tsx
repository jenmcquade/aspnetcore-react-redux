import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as SearchState from '../store/Search';

require('svg-url-loader?limit=1024!./../dist/plane.svg');

type SearchProps =
    SearchState.SearchState     // ... state we've requested from the Redux store
    & typeof SearchState.actionCreators   // ... plus action creators we've requested

export class NavMenu extends React.Component<SearchProps, SearchState.SearchState> {
    constructor(props) {
        super(props)
        this.props = {...props}
        this.state = {...props}
    }

    public render() {
        return <div className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <div className='app-logo' />
                    <NavLink exact className='navbar-brand' to={'/'}>Flight Search</NavLink>
            </div>
            <div className='clearfix'></div>
            <div className='navbar-collapse collapse'>
                <ul className='nav navbar-nav'>
                    <li>
                        <NavLink exact to={'/'}>
                            <span className='glyphicon glyphicon-home'></span> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to={'/airport'} activeClassName='active'>
                            <span className='glyphicon glyphicon-search'></span> Search by Airport
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to={'/about'} activeClassName='active'>
                            <span className='glyphicon glyphicon glyphicon-book'></span> About this App
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
      </div >;
    }
}

export default connect(
    (state: ApplicationState) => state.search, // Selects which state properties are merged into the component's props
    SearchState.actionCreators                 // Selects which action creators are merged into the component's props
)(NavMenu);