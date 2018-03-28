import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const movieResults = (state = [], action) => {
    switch(action.type) {
        case types.IMDB_RESULTS:
            return action.movies;
        case types.RESET_IMDB_RESULTS:
            return [];
        case types.GET_RELATIONS_FOR_THING:
            return action.movies;
        case types.EDIT_FIRST_THING:
            return [];
        case types.EDIT_SECOND_THING:
            return [];
        default:
            return state;
    }
};

const fetchingResults = (state = false, action) => {
    switch(action.type) {
        case types.FETCHING_RESULTS:
            return true;
        case types.IMDB_RESULTS:
            return false;
        default:
            return state;
    }
};

const insertingRelation = (state = false, action) => {
    switch(action.type) {
        case types.INSERT_RELATION:
            return true;
        case types.HAS_INSERTED_RELATION:
            return false;
        default:
            return state;
    }
};

const firstThing = (state = {}, action) => {
    switch(action.type) {
        case types.FIRST_THING_CHOSEN:
            return action.thing;
        case types.RESET_FIRST_THING:
            return {};
        case types.EDIT_FIRST_THING:
            return {};
        default:
            return state;
    }
};

// this is to display a 'none found' message after searching for relations if the result is empty
const relationSearchMode = (state = false, action ) => {
    switch(action.type) {
        case types.GET_RELATIONS_FOR_THING:
            return true;
        case types.SECOND_THING_CHOSEN:
            return false;
        case types.RESET_FIRST_THING:
            return false;
        case types.EDIT_FIRST_THING:
            return false;
        default:
            return state;
    }
};

const secondThing = (state = {}, action) => {
    switch(action.type) {
        case types.SECOND_THING_CHOSEN:
            return action.thing;
        case types.RESET_SECOND_THING:
            return {};
        case types.EDIT_SECOND_THING:
            return  {};
        default:
            return state;
    }
};

const editing = (state = 1, action) => {
    switch(action.type) {
        case types.RESET_FIRST_THING:
            return 1;
        case types.RESET_SECOND_THING:
            return 2;
        case types.SECOND_THING_CHOSEN:
            return 1;
        case types.FIRST_THING_CHOSEN:
            return 2;
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
    fetchingResults,
    insertingRelation,
    relationSearchMode,
    secondThing,
    editing,
    routing
});

export default rootReducer;
