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
