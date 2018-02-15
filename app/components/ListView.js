import PropTypes from 'prop-types';
import React from 'react';
import ListItem from './ListItem';

import { listViewSearch } from '../styles/listView.scss';

const ListView = ({ show, showCount, onChoose, things, chosenThing, onResetFirst }) => {
    let rows = [];

    if(chosenThing.Title) {
        return (
            <div className={listViewSearch}>
                <ListItem key={chosenThing.Title} showCount={showCount} data={chosenThing} onButton={onResetFirst} />
            </div>
            );
    }
    if(things && show) {
        things.forEach(p => {
            rows.push(
                <ListItem key={p.imdbID} showCount={showCount} data={p} onButton={onChoose} />
            );
        });
    }

    return <div className={listViewSearch}> {rows} </div>;
};

ListView.propTypes = {
    show: PropTypes.bool,
    onChoose: PropTypes.func,
    onResetFirst: PropTypes.func,
    chosenThing: PropTypes.object,
    showCount: PropTypes.bool,
    things: PropTypes.array
};

export default ListView;
