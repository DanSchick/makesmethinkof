import PropTypes from 'prop-types';
import React from 'react';
import ListItem from './ListItem';

const ListView = ({ show, onChoose, things, chosenThing, onResetFirst }) => {
    let rows = [];

    if(chosenThing.Title) {
        return ( <ListItem key={chosenThing.Title} data={chosenThing} onButton={onResetFirst} /> );
    }
    if(things && show) {
        things.forEach(p => {
            rows.push(
                <ListItem key={p.imdbID} data={p} onButton={onChoose} />
            );
        });
    }

    return <div className={'text-center'}> {rows} </div>;
};

ListView.propTypes = {
    show: PropTypes.bool,
    onChoose: PropTypes.func,
    onResetFirst: PropTypes.func,
    chosenThing: PropTypes.object,
    things: PropTypes.array
};

export default ListView;
