import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { IMDBResults } from '../actions';
import { chooseFirstThing } from '../actions';
import { resetFirstThing } from '../actions';
import { chooseSecondThing } from '../actions';
import { resetSecondThing } from '../actions';
import { editFirstThing } from '../actions';
import { editSecondThing } from '../actions';
import FirstThing from '../components/FirstThing';
import { filterableTable } from '../styles/filterableTable.scss';

class FilterableTable extends React.Component {
// const FilterableTable = ({ onSearch, onFirstChoose, onResetFirst, firstThing }) => {
    componentWillMount() {
        this.state = {
            searchText: ''
        };
    }

    async queryIMDB(searchText) {
        const response = await fetch('http://www.omdbapi.com/?apikey=215b996f&s=' + searchText);
        await response.json().then(res => {
            this.props.onResetFirst();
            this.props.onSearch(res.Search);
        });
    }


    render() {
        let input;
        const onChoose = this.props.editing === 1 ? this.props.onFirstChoose : this.props.onSecondChoose;
        return (
            <div className={`${filterableTable} col-6 align-items-center`}>
                <form onSubmit={ (e) => {
                    e.preventDefault();
                    this.queryIMDB(this.state.searchText);
                }
                }>
                <input
                    className={'mb-2'}
                    ref={node => {input = node;}}
                    onChange={() => this.setState({searchText: input.value})} />
                &nbsp;&nbsp;
                <span onClick={() => this.queryIMDB(this.state.searchText)}>
                <i className="fas fa-search"></i>
                </span>
                </form>

                <FirstThing onChoose={onChoose} onResetFirst={this.props.onResetFirst} things={this.props.movieResults} firstThing={this.props.firstThing} />
            </div>
        );
    }
}

FilterableTable.propTypes = {
    onSearch: PropTypes.func,
    onFirstChoose: PropTypes.func,
    onResetFirst: PropTypes.func,
    onSecondChoose: PropTypes.func,
    onResetSecond: PropTypes.func,
    onEditFirstThing: PropTypes.func,
    onEditSecondThing: PropTypes.func,
    editing: PropTypes.number,
    movieResults: PropTypes.array,
    firstThing: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        firstThing: state.firstThing,
        movieResults: state.movieResults,
        editing: state.editing
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: movies => dispatch(IMDBResults(movies)),
        onFirstChoose: thingChosen => dispatch(chooseFirstThing(thingChosen)),
        onResetFirst: () => dispatch(resetFirstThing()),
        onSecondChoose: thingChosen => dispatch(chooseSecondThing(thingChosen)),
        onResetSecond: () => dispatch(resetSecondThing()),
        onEditFirstThing: () => dispatch(editFirstThing()),
        onEditSecondThing: () => dispatch(editSecondThing())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterableTable);
