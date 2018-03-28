import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { IMDBResults, resetIMDBResults } from '../actions';
import { chooseFirstThing, resetFirstThing } from '../actions';
import { chooseSecondThing, resetSecondThing } from '../actions';
import { editFirstThing, editSecondThing } from '../actions';
import { getRelationsForThing, fetchResults } from '../actions';
import { insertRelation, hasInsertedRelation } from '../actions';
import ListView from '../components/ListView';
import { SlideDown } from 'react-slidedown';
import '../styles/slidedown.css';

import { filterableTable, middleText, thingTitle, thingTitleCurrent} from '../styles/filterableTable.scss';

class FilterableTable extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.state = {
            searchText: '',
            thisText: 'This',
            openSearch: false,
            fetchingRelations: false
        };
    }

    async queryIMDB(searchText) {
        this.props.onFetchResults();
        const response = await fetch('https://www.omdbapi.com/?apikey=215b996f&s=' + searchText);
        await response.json().then(res => {
            this.props.onSearch(res.Search);
        });
    }
    async queryGetRelations(thing) {
        this.setState({ fetchingRelations: true});
        setTimeout(() => {this.setState({fetchingRelations: false});}, 1000);
        const bodyJSON = JSON.stringify({
            firstThing: thing
        });
        const request = await fetch('https://makesmethinkof-backend.herokuapp.com/api/get-relations', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: bodyJSON
        });
        await request.json().then(res => {
            this.props.onGetRelations(res);
        });
    }

    async onSubmit() {
        this.props.onInsertRelation();
        const bodyJSON = JSON.stringify({
            firstThing: this.props.firstThing,
            secondThing: this.props.secondThing
        });
        const response = await fetch('https://makesmethinkof-backend.herokuapp.com/api/relation/insert', {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'post',
            body: bodyJSON
        });
        console.log(response);
        this.props.onHasInsertedRelation();
    }

    render() {
        let input;
        // const whichThingToChoose = this.props.editing === 1 ? this.props.onFirstChoose : this.props.onSecondChoose;
        // const onChoose = (data) => {this.props.onResetIMDB();  whichThingToChoose(data);}; // on a choice, reset the IMDB search and choose the item
        const chooseFirst = (data) => {this.props.onResetIMDB(); this.queryGetRelations(data); this.props.onEditSecondThing(); this.props.onFirstChoose(data);};
        return (
            <div className={'col-12'}>
            <div className={'col-12 row container justify-content-center align-items-center text-center'}>
                <h1>
                    <div className={'d-inline col-4'}
                        onClick={this.props.onEditFirstThing}>
                        <u className={this.props.editing === 1 ? `${thingTitleCurrent}` : `${thingTitle}`}>{this.props.firstThing.Title ? this.props.firstThing.Title : 'This'}</u>
                    </div>
                    <span className={`${middleText} col-4`}>&nbsp;Makes Me Think of&nbsp;</span>
                    <div className={'d-inline col-4'}
                        onClick={this.props.onEditSecondThing}>
                        <u className={this.props.editing === 2 ? `${thingTitleCurrent}` : `${thingTitle}`}>{this.props.secondThing.Title ? this.props.secondThing.Title : 'That'}</u>
                    </div>
                </h1>
            </div>
            <div className={'col-12 justify-content-center'}>
                <button onClick={() => this.onSubmit()}>Submit</button>
                    { this.props.insertingRelation === true ? <img src={'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif'} width={'25'} height={'25'}/> : '' }
            </div>
            <br />
            <div className={'container'}>
            <div className={'row col-12'}>
                <div className={'col-4'}>
                    <SlideDown>
                    { this.props.editing === 1 || this.props.firstThing ? <ListView show={this.props.editing === 1} showCount={false} onChoose={chooseFirst} onResetFirst={this.props.onResetFirst} things={this.props.movieResults} chosenThing={this.props.firstThing} /> : null }
                    </SlideDown>
                </div>
                <div className={`${filterableTable} col-4 h-25 justify-content-center align-items-center`}>
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
                            { this.props.fetchingResults === true ? <img src={'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif'} width={'25'} height={'25'}/> : '' }
                        </span>
                    </form>
                    <div>
                        { this.props.relationSearchMode && !this.state.fetchingRelations ? 'Suggestions: ' : null }
                        { this.props.editing === 2 ? <ListView show={this.props.editing === 2} showCount={true} onChoose={this.props.onSecondChoose} chosenThing={this.props.secondThing} things={this.props.movieResults} fetchingRelations={this.state.fetchingRelations} relationSearchMode={this.props.relationSearchMode} /> : null }
                    </div>
                </div>
                <div className={'col-4'}>
                <SlideDown>
                    { this.props.editing === 2  && !this.props.relationSearchMode || this.props.secondThing ? <ListView show={this.props.editing === 2} showCount={true} onChoose={this.props.onSecondChoose} onResetFirst={this.props.onResetSecond} things={this.props.relationSearchMode ? null : this.props.movieResults} chosenThing={this.props.secondThing} relationSearchMode={this.props.relationSearchMode} /> : null }
                </SlideDown>
                </div>
            </div>
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
    onFetchResults: PropTypes.func,
    onGetRelations: PropTypes.func,
    onInsertRelation: PropTypes.func,
    onHasInsertedRelation: PropTypes.func,
    relationSearchMode: PropTypes.bool,
    editing: PropTypes.number,
    movieResults: PropTypes.array,
    fetchingResults: PropTypes.bool,
    insertingRelation: PropTypes.bool,
    firstThing: PropTypes.object,
    secondThing: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        firstThing: state.firstThing,
        secondThing: state.secondThing,
        fetchingResults: state.fetchingResults,
        insertingRelation: state.insertingRelation,
        relationSearchMode: state.relationSearchMode,
        movieResults: state.movieResults,
        editing: state.editing
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: movies => dispatch(IMDBResults(movies)),
        onResetIMDB: () => dispatch(resetIMDBResults()),
        onFetchResults: () => dispatch(fetchResults()),
        onFirstChoose: thingChosen => dispatch(chooseFirstThing(thingChosen)),
        onResetFirst: () => dispatch(resetFirstThing()),
        onSecondChoose: thingChosen => dispatch(chooseSecondThing(thingChosen)),
        onResetSecond: () => dispatch(resetSecondThing()),
        onEditFirstThing: () => dispatch(editFirstThing()),
        onEditSecondThing: () => dispatch(editSecondThing()),
        onGetRelations: data => dispatch(getRelationsForThing(data)),
        onInsertRelation: () => dispatch(insertRelation()),
        onHasInsertedRelation: () => dispatch(hasInsertedRelation())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterableTable);
