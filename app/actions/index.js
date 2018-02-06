import * as types from './types';

export function IMDBResults(movies) {
    return  {
        type: types.IMDB_RESULTS,
        movies
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

export function chooseSecondThing(thing) {
    return {
        type: types.SECOND_THING_CHOSEN,
        thing
    };
}

export function resetSecondThing() {
    return {
        type: types.RESET_SECOND_THING,
    };
}

export function editFirstThing() {
    return {
        type: types.EDIT_FIRST_THING
    };
}

export function editSecondThing() {
    return {
        type: types.EDIT_SECOND_THING
    };
}
