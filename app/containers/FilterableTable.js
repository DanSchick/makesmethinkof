import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { filterTable } from '../actions';
import { chooseFirstThing } from '../actions';
import FirstThing from '../components/FirstThing';
import { filterableTable } from '../styles/filterableTable.scss';

const FilterableTable = ({ filter, onFilter, onFirstChoose }) => {
    let input;

    return (
        <div className={filterableTable}>
            <input
                value={filter}
                ref={node => {input = node;}}
                onChange={() => onFilter(input.value)} />

            <FirstThing filter={filter} onFirstChoose={onFirstChoose} />
        </div>
    );
};

FilterableTable.propTypes = {
    filter: PropTypes.string,
    onFilter: PropTypes.func,
    onFirstChoose: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFilter: filterText => dispatch(filterTable(filterText)),
        onFirstChoose: thingChosen => dispatch(chooseFirstThing(thingChosen))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterableTable);
