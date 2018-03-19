import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { push } from 'react-router-redux'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as SearchState from '../store/Search';
import setAirportFromUrl from '../App';

// At runtime, Redux will merge together...
type SearchProps =
    SearchState.SearchState     // ... state we've requested from the Redux store
    & typeof SearchState.actionCreators   // ... plus action creators we've requested

class Airport extends React.Component<SearchProps, SearchState.SearchState> {
    public constructor(SearchProps: any) {
        super(SearchProps)
        this.props = SearchProps;
        this.state = {
            ...SearchProps
        };
        this.change = this.change.bind(this);
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

    public componentWillReceiveProps(nextProps) {
        this.setAirportFromUrl(nextProps);
    }

    public change(event) {
        this.props.setAirport({ code: event.target.value, name: event.target.options[event.target.selectedIndex].innerHTML });
        this.props.requestFlights(event.target.value.toString(), { type: 'departs', label: 'Departing'});
        this.render();
    }

    private renderSelect() {
        return <select id="airport" ref="airportSelect" onChange={this.change} value={this.props.airport.code} className="selectpicker">
            <option value="ALL">Airports</option>
            {this.props.airports.map(airport =>
                <option key={airport.code} value={airport.code}>{airport.name}</option>
            )};
        </select>
    }

    public render() {
        return <div className="msg-body">
            <div className="msg-wrapper">
                <div className="msg-inner">
                    <h2>Please select an airport</h2>
                    {this.renderSelect() }
                </div>
            </div>
        </div>;
    }  
}   

export default connect(
    (state: ApplicationState) => state.search, // Selects which state properties are merged into the component's props
    SearchState.actionCreators                 // Selects which action creators are merged into the component's props
)(Airport);





