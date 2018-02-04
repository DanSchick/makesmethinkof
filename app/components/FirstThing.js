import PropTypes from 'prop-types';
import React from 'react';
import ProductRow from './ProductRow';

const things = [
  { category: 'Movie', name: 'Memento' },
  { category: 'Movie', name: 'The Prestige' },
  { category: 'Movie', name: 'Toy Story' }
];

const FirstThing = ({ filter, onFirstChoose }) => {
    let rows = [];

    things.forEach(p => {
        const nameLC = p.name.toLowerCase();
        const filterLC = filter.toLowerCase();

        if (nameLC.indexOf(filterLC) !== -1) {
            rows.push(
                <ProductRow key={p.name} data={p} onFirstChoose={onFirstChoose}/>
            );
        }
    });

    return <div> {rows} </div>;
};

FirstThing.propTypes = {
    filter: PropTypes.string,
    onFirstChoose: PropTypes.object
};

export default FirstThing;
