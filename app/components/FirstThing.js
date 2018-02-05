import PropTypes from 'prop-types';
import React from 'react';
import ProductRow from './ProductRow';

const FirstThing = ({ onFirstChoose, onResetFirst, firstThing, things }) => {
    let rows = [];

    if(firstThing.Title) {
        return ( <ProductRow key={firstThing.Title} data={firstThing} onButton={onResetFirst} /> );
    }
    if(things) {
        things.forEach(p => {
            rows.push(
                <ProductRow key={p.Title} data={p} onButton={onFirstChoose} />
            );
        });
    }

    return <div> {rows} </div>;
};

FirstThing.propTypes = {
    onFirstChoose: PropTypes.func,
    onResetFirst: PropTypes.func,
    firstThing: PropTypes.object,
    things: PropTypes.array
};

export default FirstThing;
