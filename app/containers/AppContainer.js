import PropTypes from 'prop-types';
import React from 'react';
import App from '../components/App';
import { resetFirstThing } from '../actions';
import { resetSecondThing } from '../actions';
import { editFirstThing } from '../actions';
import { editSecondThing } from '../actions';
import { connect } from 'react-redux';


class AppContainer extends React.Component {
    render() {
        // return (<App firstThing={this.props.firstThing} secondThing={this.props.secondThing}
        // onSecondThingClick={this.props.onSecondThingClick} onFirstThingClick={this.props.onFirstThingClick} />);
        return (<App {... this.props} />);
    }
}

AppContainer.propTypes = {
    firstThing: PropTypes.object,
    secondThing: PropTypes.object,
    onFirstThingClick: PropTypes.func,
    onSecondThingClick: PropTypes.func,
    onEditFirstThing: PropTypes.func,
    onEditSecondThing: PropTypes.func,
    editing: PropTypes.number
};

const mapStateToProps = (state) => {
    return {
        firstThing: state.firstThing,
        secondThing: state.secondThing,
        editing: state.editing
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFirstThingClick: () => dispatch(resetFirstThing()),
        onSecondThingClick: () => dispatch(resetSecondThing()),
        onEditFirstThing: () => dispatch(editFirstThing()),
        onEditSecondThing: () => dispatch(editSecondThing())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
