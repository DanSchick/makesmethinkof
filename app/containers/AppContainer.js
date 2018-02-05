import PropTypes from 'prop-types';
import React from 'react';
import App from '../components/App';
import { connect } from 'react-redux';


class AppContainer extends React.Component {
    render() {
        return (<App firstThing={this.props.firstThing}/>);
    }
}

AppContainer.propTypes = {
    firstThing: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        firstThing: state.firstThing
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
