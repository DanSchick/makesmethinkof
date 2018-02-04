import * as types from './types';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter
    };
}

export function chooseFirstThing(thing) {
    return {
        type: types.FIRST_THING_CHOSEN,
        thing
    };
}

export function resetFirstThing() {
    return {
        type: types.RESET_FIRST_THING,
    };
}
