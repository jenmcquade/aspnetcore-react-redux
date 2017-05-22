import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Link } from 'react-router';
import { browserHistory } from 'react-router'; 
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as SearchState from '../store/Search';

// At runtime, Redux will merge together...
type SearchProps =
    SearchState.SearchState     // ... state we've requested from the Redux store
    & typeof SearchState.actionCreators   // ... plus action creators we've requested


class Airport extends React.Component<SearchProps, SearchState.SearchState> {
    componentWillMount() {
        // This method runs when the component is first added to the page
        this.props.requestAirports();
    }

    public constructor(SearchProps) {
        super(SearchProps)
        this.state = {
            airports: this.props.airports,
            airport: { code: this.props.airport.code, name: this.props.airport.code },
            flights: this.props.flights,
            isLoading: this.props.isLoading,
            sorts: this.props.sorts,
            sort: this.props.sort
        };
        this.change = this.change.bind(this);
    }

    public change(event) {
        if (event.target.value != "ALL") {
            this.props.setAirport({ code: event.target.value, name: event.target.options[event.target.selectedIndex].innerHTML });
            browserHistory.push('filter/' + event.target.value);
        } 
    }

    private renderSelect() {
        return <select id="airport" ref="airportSelect" onChange={this.change} value={this.state.airport.code} className="selectpicker">
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


