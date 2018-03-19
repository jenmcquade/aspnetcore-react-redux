import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator,createStore, combineReducers, applyMiddleware } from 'redux';
import { AppThunkAction } from './';
import createHistory from 'history/createBrowserHistory';
import { push, RouterAction, routerMiddleware } from 'react-router-redux'
import configureStore from '../configureStore';
const history = createHistory();

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface SearchState {
    isLoading: boolean;
    airport: Airport;
    airports: Airport[];
    flights: Flight[];
    sorts: Sort[];
    sort: Sort;
}

export interface Airport {
    code: string;
    name: string;
}

export interface Flight {
    from: string;
    to: string;
    flightNumber: number;
    departs: string;
    arrives: string;
    mainCabinPrice: string;
    firstClassPrice: string;
}

export interface Sort {
    type: string;
    label: string;
}

export interface push {
    type: string;
    label: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
interface SetAirportAction {
    type: "SET_AIRPORT",
    airport: Airport;
}
interface RequestAirportSearchAction {
    type: 'REQUEST_AIRPORT_SEARCH'
}

interface RequestFlightSearchAction {
    type: 'REQUEST_FLIGHT_SEARCH',
    sort: Sort;
}

interface ReceiveAirportSearchAction {
    type: 'RECEIVE_AIRPORT_SEARCH',
    airports: Airport[];
}

interface ReceiveFlightSearchAction {
    type: 'RECEIVE_FLIGHT_SEARCH',
    flights: Flight[];
}

interface SetSortAction {
    type: "SET_SORT",
    sort: Sort;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetAirportAction | RequestAirportSearchAction | RequestFlightSearchAction | ReceiveAirportSearchAction | ReceiveFlightSearchAction | SetSortAction | RouterAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setAirport: (airport: Airport): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SET_AIRPORT', airport: airport });
    },
    requestAirports: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch(`/api/Search/Airports`)
            .then(response => response.json() as Promise<Airport[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_AIRPORT_SEARCH', airports: data });
            });
        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'REQUEST_AIRPORT_SEARCH' });
    },
    requestFlights: (airportCode: string, sort: Sort): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch(`/api/Search/Flights?code=${airportCode}&sort=${sort.type}`)
            .then(response => response.json() as Promise<Flight[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_FLIGHT_SEARCH', flights: data });
                dispatch(push('/filter/' + airportCode + '/' + sort.type));
            });
        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'REQUEST_FLIGHT_SEARCH', sort: sort });
    },
    setSort: (airportCode:string, sort: Sort): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SET_SORT', sort: sort });
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: SearchState = {
    airports: [],
    airport: { code: "ALL", name: "all locations" },
    flights: [],
    isLoading: false,
    sorts: [
        { type: "departs", label: "Departing" },
        { type: "flightNumber", label: "Flight number" },
        { type: "cabinPrice", label: "Price" },
    ],
    sort: { type: "flightNumber", label: "Flight number" }
};

export const reducer: Reducer<SearchState> = (state: SearchState, action: KnownAction) => {
    switch (action.type) {
        case 'SET_AIRPORT':
            return {
                airports: state.airports,
                airport: action.airport,
                flights: state.flights,
                isLoading: false,
                sorts: state.sorts,
                sort: state.sort,
            };
        case 'REQUEST_AIRPORT_SEARCH':
            return {
                airports: state.airports,
                airport: state.airport,
                flights: state.flights,
                isLoading: true,
                sorts: state.sorts,
                sort: state.sort,
            };
        case 'REQUEST_FLIGHT_SEARCH':
            return {
                airports: state.airports,
                airport: state.airport,
                flights: state.flights,
                isLoading: true,
                sorts: state.sorts,
                sort: state.sort,
            };
        case 'RECEIVE_AIRPORT_SEARCH':
            return {
                airports: action.airports,
                airport: state.airport,
                flights: state.flights,
                isLoading: false,
                sorts: state.sorts,
                sort: state.sort,
            };
        case 'RECEIVE_FLIGHT_SEARCH':
            return {
                airports: state.airports,
                airport: state.airport,
                flights: action.flights,
                isLoading: false,
                sorts: state.sorts,
                sort: state.sort,
            };
        case 'SET_SORT':
            return {
                airports: state.airports,
                airport: state.airport,
                flights: state.flights,
                isLoading: false,
                sorts: state.sorts,
                sort: action.sort,
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: {} = action;
    }

    return state || unloadedState;
};

