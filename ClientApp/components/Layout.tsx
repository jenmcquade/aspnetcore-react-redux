import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';
import { ApplicationState } from '../store';
import * as SearchState from '../store/Search';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import Home from './Home';
import Airport from './Airport';
import Filter from './Filter';
import About from './About';

// At runtime, Redux will merge together...
type SearchProps =
    SearchState.SearchState     // ... state we've requested from the Redux store
    & typeof SearchState.actionCreators   // ... plus action creators we've requested

export class Layout extends React.Component<SearchProps, SearchState.SearchState> {
    public constructor(SearchProps) {
        super(SearchProps)
        this.props = SearchProps;
        this.state = {
            ...SearchProps,
        }
    }
    public render() {
        return <BrowserRouter >
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-3'>
                        <NavMenu {...this.props} />
                    </div>
                    <div className='col-sm-9'>
                        <Switch>
                            <Route exact path='/' component={Home} ><div><Home {...this.props}/></div></Route>
                            <Route exact path='/airport' ><div><Airport {...this.props}/><Filter {...this.props}/></div></Route>
                            <Route exact path='/filter' ><div><Airport {...this.props}/><Filter {...this.props}/></div></Route>
                            <Route exact path='/filter/:airportCode' ><div><Airport {...this.props}/><Filter {...this.props}/></div></Route> 
                            <Route exact path='/filter/:airportCode/:sortBy' ><div><Airport {...this.props}/><Filter {...this.props}/></div></Route>
                            <Route exact path='/about' component={About}><div><About {...this.props}/></div></Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    }
}

export default connect(
    (state: ApplicationState) => state, // Selects which state properties are merged into the component's props
    SearchState.actionCreators                 // Selects which action creators are merged into the component's props
)(Layout);

