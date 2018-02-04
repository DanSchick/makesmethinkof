import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const filter = (state = '', action) => {
    switch (action.type) {
        case types.FILTER:
            return action.filter;
        default:
            return state;
    }
};

const chooseFirstThing = (state = '', action) => {
    switch (action.type) {
        case types.FIRST_THING_CHOSEN:
            return action.thing;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    filter,
    chooseFirstThing,
    routing
});

export default rootReducer;
