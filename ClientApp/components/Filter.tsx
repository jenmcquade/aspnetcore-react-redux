import * as React from 'react';
import * as ReactDom from 'react-dom';
import { jQuery } from 'jquery';
import { Isotope } from 'isotope-layout';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as SearchState from '../store/Search';

// At runtime, Redux will merge together...
type SearchProps =
    SearchState.SearchState     // ... state we've requested from the Redux store
    & typeof SearchState.actionCreators   // ... plus action creators we've requested
    & { params: { airportCode: string } };       // ... plus incoming routing parameters

class Filter extends React.Component<SearchProps, SearchState.SearchState> {
    public constructor(SearchProps: any) {
        super(SearchProps)
        this.props = SearchProps;
        this.state = {
            ...SearchProps
        };
        this.change = this.change.bind(this);
    }

    public componentWillMount() {
        this.setAirportFromUrl(this.props);
    }

    public render() {
        return <div className="msg-body">
            <div className="msg-wrapper">
                <div className="msg-inner">
                    {this.renderTitleIntro()}
                    {this.renderSortSelection()}
                    <div className="grid">
                        { this.renderFlights() }
                    </div>
                </div>
            </div>
        </div>;
    }  

    public change(event) {
       this.props.requestFlights(this.props.airport.code.toString(), { type: event.target.value, label: event.target.options[event.target.selectedIndex].innerHTML });
       this.props.setSort(this.props.airport.code.toString(), { type: event.target.value, label: event.target.options[event.target.selectedIndex].innerHTML })
       this.render();
    }

    public setAirportFromUrl(props) {
        if(!props.isLoading) {
            let location = props.router.location.pathname;
            let airportCode = location.split('/filter/')[1] ? location.split('/filter/')[1] : "ALL";
            for(let ap in props.airports) {
                if(props.airports[ap].code === airportCode) {
                    props.setAirport({ code: props.airports[ap].code, name: props.airports[ap].name });
                }
            }
            this.props.requestFlights(this.props.airport.code, { type: 'departing', label: 'Department'});  
        }
    }

    private renderTitleIntro() {
        return <h2 className="airport">
            Flights leaving { this.props.airport.name }
        </h2>
    }

    private renderSortSelection() {
        return <select id="sort" ref="sortSelect" onChange={this.change} value={this.props.sort.type} className="selectpicker">
            <option value="flightNumber">Sort by</option>
            {this.props.sorts.map(sort =>
                <option key={sort.type} value={sort.type} >{sort.label}</option>
            )};
        </select>
    } 

    private renderFlights() {
        return <div className="flight">
            {this.props.flights.map(flight =>
                <div key={flight.flightNumber + "/" + flight.from + "/" + flight.to} className="plan col-xs-8 col-sm-4 col-md-3">
                    <div className="title">{flight.flightNumber} {flight.from} to {flight.to}</div>
                    <div className="details">
                        <ul>
                            <li>Departs: { new Date(flight.departs).getHours() % 12 || 12 }:{ new Date(flight.departs).getMinutes() < 10 ? new Date(flight.departs).getMinutes() + "0" : new Date(flight.departs).getMinutes() } { new Date(flight.departs).getHours() > 11 ? "PM" : "AM" }</li>
                            <li>Arrives: { new Date(flight.arrives).getHours() % 12 || 12 }:{ new Date(flight.arrives).getMinutes() < 10 ? new Date(flight.arrives).getMinutes() + "0" : new Date(flight.arrives).getMinutes() } { new Date(flight.arrives).getHours() > 11 ? "PM" : "AM" }</li>
                            <li>Cabin: ${flight.mainCabinPrice}</li>
                            <li>First Class: ${flight.firstClassPrice}</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    }
}

export default connect(
    (state: ApplicationState) => state.search, // Selects which state properties are merged into the component's props
    SearchState.actionCreators                 // Selects which action creators are merged into the component's props
)(Filter);
