import * as types from './types';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter
    };
}

export function chooseFirstThing(thing) {
    console.log('here');
    return {
        type: types.FIRST_THING_CHOSEN,
        thing
    };
}
