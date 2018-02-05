import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { footer } from '../styles/footer.scss';
import { app } from '../styles/app.scss';
import Routes from '../routes';

const App = ({ firstThing }) => {
    return (
    <div className={`${app} container`}>
        <h1><u>{firstThing.Title ? firstThing.Title : 'This'}</u> Makes Me Think of <u>That</u></h1>
        { Routes }
        <footer className={footer}>
            <Link to="/">Filterable Table</Link>
            <Link to="/about">About</Link>
        </footer>
    </div>
    );
};

App.propTypes = {
    firstThing: PropTypes.object
};

export default App;
