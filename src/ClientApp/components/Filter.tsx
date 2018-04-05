import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as $ from "jquery";
import * as Isotope from 'isotope-layout';
import { Link, withRouter } from 'react-router-dom';
import { push } from 'react-router-redux'
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as StoreModule from '../store';
import * as SearchState from '../store/Search';
import { StoreType, PropsType } from './Routes';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

export const changeSort = (event: any, props: PropsType) => {
	let v = event.target.value;
	let l = event.target.options[event.target.selectedIndex].innerHTML;
	let apc = props.search.airport.code.toString(); 
	props.requestFlights(apc, {type: v, label: l});
	props.setSort(apc, { type: v, label: l });
	props.dispatch(push('/filter/' + apc + '/' + v));
}

const renderSortSelection = (props) => {
	return <div className="container">
		<FormGroup id="sort" controlId="formControlsSelect">
			<FormControl
				ref="sortSelect"
				onChange={(e) => changeSort(e, props)}
				defaultValue={props.search.sort.type}
				componentClass="select"
				placeholder="select"
				className="selectpicker"
			>
				<option value="departs">Sort by</option>
				{props.search.sorts.map((sort) =>
					<option key={sort.type} value={sort.type} >{sort.label}</option>
				)};
			</FormControl>
		</FormGroup>
	</div>
}

const renderTitleIntro = (name) => {
	return <h2 className="airport">
		Flights leaving {name}
	</h2>
}

class Filter extends React.Component<PropsType, ApplicationState> {

	public componentDidMount() {
		let apc = this.props.search.airport.code.toString();
		let path = window.location.pathname;
		this.props.setAirportFromUrl(
			window.location.pathname, SearchState.actionCreators,
		);
		this.props.requestFlights(
			this.props.search.airport.code,
			this.props.search.sort
		);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.search.airport.code !== nextProps.search.airport.code) {
			let apc = this.props.search.airport.code.toString();
			nextProps.dispatch(nextProps.setAirportFromUrl(
				window.location.pathname, SearchState.actionCreators
			));
			nextProps.requestFlights(
				nextProps.search.airport.code,
				nextProps.search.sort
			);
		}
	}

	private renderFlights() {
		return <div className="flight">
			{this.props.search.flights.map((flight) =>
				<div key={flight.flightNumber + "/" + flight.from + "/" + flight.to} className="plan col-12 col-xs-12 col-sm-7 col-md-5 col-lg-5 col-xl-3">
					<div className="title">{flight.flightNumber} {flight.from} to {flight.to}</div>
					<div className="details">
						<ul>
							<li>Departs: {new Date(flight.departs).getHours() % 12 || 12}:{new Date(flight.departs).getMinutes() < 10 ? new Date(flight.departs).getMinutes() + "0" : new Date(flight.departs).getMinutes()} {new Date(flight.departs).getHours() > 11 ? "PM" : "AM"}</li>
							<li>Arrives: {new Date(flight.arrives).getHours() % 12 || 12}:{new Date(flight.arrives).getMinutes() < 10 ? new Date(flight.arrives).getMinutes() + "0" : new Date(flight.arrives).getMinutes()} {new Date(flight.arrives).getHours() > 11 ? "PM" : "AM"}</li>
							<li>Cabin: ${flight.mainCabinPrice}</li>
							<li>First Class: ${flight.firstClassPrice}</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	}

	public render() {
		return <div className="msg-body">
			<div className="msg-wrapper">
				<div className="msg-inner">
					{renderTitleIntro(this.props.search.airport.name)}
					{renderSortSelection(this.props)}
					<div className="grid">
						{this.renderFlights()}
					</div>
				</div>
			</div>
		</div>;
	}
}

export default connect(
	(state) => state, // Selects which state properties are merged into the component's props
	SearchState.actionCreators, // Selects which action creators are merged into the component's props
)(Filter);
