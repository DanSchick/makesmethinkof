import PropTypes from 'prop-types';
import React from 'react';
import ListItem from './ListItem';

import { listViewSearch } from '../styles/listView.scss';

const ListView = ({ show, showCount, onChoose, things, chosenThing, onResetFirst, fetchingRelations, relationSearchMode }) => {
    let rows = [];

    // if we're searching for relations and there's none found
    if(relationSearchMode && things.length === 0 && !fetchingRelations) {
        return (
            <div className={listViewSearch}>
                <p><strong>No comparisons found</strong><br /> Add your own!</p>
            </div>
        );
    }

    // if we're in the process of querying backend for relations
    if(fetchingRelations) {
        return (
            <div className={listViewSearch}>
                <p>Searching...</p>
            </div>
        );
    }

    // if there's a chosen thing to display
    if(chosenThing.Title) {
        return (
            <div className={listViewSearch}>
                <ListItem key={chosenThing.Title} showCount={showCount} data={chosenThing} onButton={onResetFirst} />
            </div>
            );
    }
    // display search results
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
    things: PropTypes.array,
    fetchingRelations: PropTypes.bool,
    relationSearchMode: PropTypes.bool
};

export default ListView;
