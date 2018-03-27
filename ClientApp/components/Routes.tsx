import * as React from 'react';
import { Router } from 'react-router';
import { withRouter, Switch, Route, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux';
import * as StoreModule from '../store';
import { ApplicationState } from '../store';
import { actionCreators } from '../store/Search';
import * as SearchState from '../store/Search';
import { createMemoryHistory } from 'history';
import configureStore from '../configureStore';

import Layout from './Layout';
import Home from './Home';
import Airport from './Airport';
import Filter from './Filter';
import About from './About';

// At runtime, Redux will merge together...
export type PropsType =
	& ApplicationState
	& typeof SearchState.actionCreators
	& StoreType

const store = configureStore(createMemoryHistory());

export type StoreType = typeof store;

export class Routes extends React.Component<PropsType, ApplicationState> {
	public render() {
		return <Layout {...this.props}>
			<Route exact path='/' render={() => <Home/>}  />
			<Route path='/airport' render={() => <Airport {...this.props} />} />
			<Route exact path='/filter' render={() => <Filter {...this.props} />} />
			<Route exact path='/filter/:airportCode' render={() => <Filter {...this.props} />} />
			<Route exact path='/filter/:airportCode/:sortBy' render={() => <Filter {...this.props} />} />
			<Route path='/about' render={() => <About />} />
		</Layout>
	}
}

export default connect(
	(state: ApplicationState) => state, // Selects which state properties are merged into the component's props
	SearchState.actionCreators, // Selects which action creators are merged into the component's props
)(Routes);


