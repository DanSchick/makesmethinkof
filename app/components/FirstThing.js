import PropTypes from 'prop-types';
import React from 'react';
import ProductRow from './ProductRow';

const FirstThing = ({ onChoose, things }) => {
    let rows = [];

    // if(firstThing.Title) {
    //     return ( <ProductRow key={firstThing.Title} data={firstThing} onButton={onResetFirst} /> );
    // }
    if(things) {
        things.forEach(p => {
            rows.push(
                <ProductRow key={p.Title + p.Year} data={p} onButton={onChoose} />
            );
        });
    }

    return <div className={'text-center'}> {rows} </div>;
};

FirstThing.propTypes = {
    onChoose: PropTypes.func,
    onResetFirst: PropTypes.func,
    firstThing: PropTypes.object,
    things: PropTypes.array
};

export default FirstThing;
