import * as React from 'react';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { StoreType, PropsType } from './Routes';
import { ApplicationState } from '../store';
import * as SearchState from '../store/Search';

require('svg-url-loader?limit=1024!../plane.svg');

export class NavMenu extends React.Component<PropsType, ApplicationState> {
	public render() {
		return <div className='main-nav'>
			<div className='navbar navbar-inverse'>
				<div className='navbar-header'>
					<NavLink exact className='navbar-brand' to={'/'}>
						<div className='app-logo' />
					</NavLink>
				</div>
				<div className='clearfix'></div>
				<div className='container'>
					<ul className='nav navbar-nav'>
						<li>
							<NavLink exact to={'/'}>
								<span className='fa fa-home'></span> Home
              </NavLink>
						</li>
						<li>
							<NavLink exact to={'/airport'} activeClassName='active'>
								<span className='fa fa-search'></span> Search by Airport
              </NavLink>
						</li>
						<li>
							<NavLink
								exact to={'/filter/' +
									this.props.search.airport.code.toString() +
									'/' + this.props.search.sort.type}
								activeClassName='active'
							>
								<span className='fa fa-th-list'></span> Sort Results
							</NavLink>
						</li>
						<li>
							<NavLink exact to={'/about'} activeClassName='active'>
								<span className='fa fa-book'></span> About this App
              </NavLink>
						</li>
					</ul>
				</div>
			</div>
		</div>;
    }
}

export default connect(
	(state: ApplicationState) => state, // Selects which state properties are merged into the component's props
	SearchState.actionCreators, // Selects which action creators are merged into the component's props
)(NavMenu);
