import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { IMDBResults, resetIMDBResults } from '../actions';
import { chooseFirstThing, resetFirstThing } from '../actions';
import { chooseSecondThing, resetSecondThing } from '../actions';
import { editFirstThing, editSecondThing } from '../actions';
import FirstThing from '../components/FirstThing';

import { filterableTable, currentThing, middleText } from '../styles/filterableTable.scss';

class FilterableTable extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.state = {
            searchText: '',
            thisText: 'This',
            openSearch: false
        };
    }

    async queryIMDB(searchText) {
        const response = await fetch('https://www.omdbapi.com/?apikey=215b996f&s=' + searchText);
        await response.json().then(res => {
            this.props.onSearch(res.Search);
        });
    }

    render() {
        let input;
        const whichThingToChoose = this.props.editing === 1 ? this.props.onFirstChoose : this.props.onSecondChoose;
        const onChoose = (data) => {this.props.onResetIMDB();  whichThingToChoose(data);};
        return (
            <div className={'row justify-content-center align-items-center text-center'}>
            <div className={'col-12'}>
            <h1>
                <div className={this.props.editing === 1 ? `d-inline ${currentThing}` : 'd-inline'}
                    onClick={this.props.onEditFirstThing}>
                    <u>{this.props.firstThing.Title ? this.props.firstThing.Title : 'This'}</u>
                </div>
                <span className={`${middleText}`}>&nbsp;Makes Me Think of&nbsp;</span>
                <div className={this.props.editing === 2 ? `d-inline ${currentThing}` : 'd-inline'}
                    onClick={this.props.onEditSecondThing}>
                    <u>{this.props.secondThing.Title ? this.props.secondThing.Title : 'That'}</u>
                </div>
            </h1>
            </div>
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
            </div>
        );
    }
}

FilterableTable.propTypes = {
    onSearch: PropTypes.func,
    onResetIMDB: PropTypes.func,
    onFirstChoose: PropTypes.func,
    onResetFirst: PropTypes.func,
    onSecondChoose: PropTypes.func,
    onResetSecond: PropTypes.func,
    onEditFirstThing: PropTypes.func,
    onEditSecondThing: PropTypes.func,
    editing: PropTypes.number,
    movieResults: PropTypes.array,
    firstThing: PropTypes.object,
    secondThing: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        firstThing: state.firstThing,
        secondThing: state.secondThing,
        movieResults: state.movieResults,
        editing: state.editing
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: movies => dispatch(IMDBResults(movies)),
        onResetIMDB: () => dispatch(resetIMDBResults()),
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
