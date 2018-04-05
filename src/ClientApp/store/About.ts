import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator,createStore, combineReducers, applyMiddleware } from 'redux';
import { AppThunkAction } from './';
import { push, routerMiddleware } from 'react-router-redux'
import configureStore from '../configureStore';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface AboutState {
    isLoading: boolean;
    markdown: string;
}

export interface Markdown {
    value: string;
}

interface SetAboutMarkdown {
    type: "SET_ABOUT_MARKDOWN",
    markdown: string;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SetAboutMarkdown;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    setAboutMarkDown: (markdown: Markdown): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SET_ABOUT_MARKDOWN', markdown: markdown.value}); 
    } 
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const unloadedState: AboutState = {
    isLoading: false,
    markdown: '<div></div>',
};

export const reducer: Reducer<AboutState> = (state: AboutState, action: KnownAction) => {
    switch (action.type) {
        case 'SET_ABOUT_MARKDOWN':
            return {
                isLoading: false,
                markdown: action.markdown,
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: {} = action;
    }

    return state || unloadedState;
};

