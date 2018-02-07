import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { footer } from '../styles/footer.scss';
import { app } from '../styles/app.scss';
import Routes from '../routes';

const App = () => {
    return (
    <div className={`${app}container jumbotron h-100`}>
        <div className={'row justify-content-center align-items-center text-center'}>
            { Routes }
        </div>
        <div className={'row'}>
            <footer className={footer}>
                <Link to="/">Filterable Table</Link>
                <Link to="/about">About</Link>
            </footer>
        </div>
    </div>
    );
};

App.propTypes = {
    firstThing: PropTypes.object,
    onFirstThingClick: PropTypes.func,
    secondThing: PropTypes.object,
    onSecondThingClick: PropTypes.func,
    onEditFirstThing: PropTypes.func,
    onEditSecondThing: PropTypes.func
};

export default App;
