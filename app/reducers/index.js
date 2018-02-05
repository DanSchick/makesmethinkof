import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const movieResults = (state = [], action) => {
    switch (action.type) {
        case types.IMDB_RESULTS:
            return action.movies;
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

const rootReducer = combineReducers({
    movieResults,
    firstThing,
    routing
});

export default rootReducer;
