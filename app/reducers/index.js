import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const movieResults = (state = [], action) => {
    switch (action.type) {
        case types.IMDB_RESULTS:
            return action.movies;
        case types.RESET_IMDB_RESULTS:
            return [];
        default:
            return state;
    }
};

const firstThing = (state = {}, action) => {
    switch (action.type) {
        case types.FIRST_THING_CHOSEN:
            return action.thing;
        case types.RESET_FIRST_THING:
            return {};
        default:
            return state;
    }
};

const secondThing = (state = {}, action) => {
    switch (action.type) {
        case types.SECOND_THING_CHOSEN:
            return action.thing;
        case types.RESET_SECOND_THING:
            return {};
        default:
            return state;
    }
};

const editing = (state = 1, action) => {
    switch (action.type) {
        case types.EDIT_FIRST_THING:
            return 1;
        case types.EDIT_SECOND_THING:
            return 2;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    movieResults,
    firstThing,
    secondThing,
    editing,
    routing
});

export default rootReducer;
