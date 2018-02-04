import PropTypes from 'prop-types';
import React from 'react';
import ProductRow from './ProductRow';

const things = [
  { category: 'Movie', name: 'Memento' },
  { category: 'Movie', name: 'The Prestige' },
  { category: 'Movie', name: 'Toy Story' }
];

const FirstThing = ({ filter, onFirstChoose, onResetFirst, firstThing }) => {
    let rows = [];

    console.log(firstThing);
    if(firstThing.name) {
        rows.push(
            <ProductRow key={firstThing.name} data={firstThing} onButton={onResetFirst}/>
        );
        return <div> {rows} </div>;
    }
    things.forEach(p => {
        const nameLC = p.name.toLowerCase();
        const filterLC = filter.toLowerCase();

        if (nameLC.indexOf(filterLC) !== -1) {
            rows.push(
                <ProductRow key={p.name} data={p} onButton={onFirstChoose}/>
            );
        }
    });

    return <div> {rows} </div>;
};

FirstThing.propTypes = {
    filter: PropTypes.string,
    onFirstChoose: PropTypes.object,
    onResetFirst: PropTypes.object,
    firstThing: PropTypes.object
};

export default FirstThing;
