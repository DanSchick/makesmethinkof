import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { IMDBResults } from '../actions';
import { chooseFirstThing } from '../actions';
import { resetFirstThing } from '../actions';
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
        return (
            <div className={filterableTable}>
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

                <FirstThing onFirstChoose={this.props.onFirstChoose} onResetFirst={this.props.onResetFirst} things={this.props.movieResults} firstThing={this.props.firstThing} />
            </div>
        );
    }
}

FilterableTable.propTypes = {
    filter: PropTypes.string,
    onSearch: PropTypes.func,
    onFirstChoose: PropTypes.func,
    onResetFirst: PropTypes.func,
    movieResults: PropTypes.array,
    firstThing: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        firstThing: state.firstThing,
        movieResults: state.movieResults
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: movies => dispatch(IMDBResults(movies)),
        onFirstChoose: thingChosen => dispatch(chooseFirstThing(thingChosen)),
        onResetFirst: () => dispatch(resetFirstThing())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterableTable);
