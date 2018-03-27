import * as React from 'react';
import * as ReactDom from 'react-dom';
import { push } from 'react-router-redux'
import { withRouter, RouteComponentProps, } from "react-router-dom";
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import * as StoreModule from '../store';
import { StoreType, PropsType } from './Routes';
import { ApplicationState } from '../store';
import * as SearchState from '../store/Search';

export const changeAirport = (event, c) => {
	try {
		let v = event.target.value;
		let n = event.target.options[event.target.selectedIndex].innerHTML;
		let s = c.props.search.sort;
		c.props.setAirport( { code: v, name: n} );
		c.props.requestFlights(v, s);
		c.props.dispatch(push('/filter/' + v + '/' + s.type));
	} catch (e) {
		console.log(e.message);
	}
}

export const renderSelect = (c) => {
	return <select id="airport" ref="airportSelect"
			onChange={(e) => { changeAirport(e, c) } }
			value={c.props.search.airport.code}
			className="selectpicker"
		>
		<option value="ALL">Airports</option>
		{c.props.search.airports.map((airport: any) =>
			<option key={airport.code} value={airport.code}>{airport.name}</option>
		)};
	</select>
}

class Airport extends React.Component<PropsType, ApplicationState> {
	public render() {
		return <div className="msg-body">
			<div className="msg-wrapper">
				<div className="msg-inner">
					<h2>Please select an airport</h2>
					{renderSelect(this)}
				</div>
			</div>
		</div>;
	}
}

export default connect(
	(state: ApplicationState) => state, // Selects which state properties are merged into the component's props
	SearchState.actionCreators, // Selects which action creators are merged into the component's props
)(Airport);







