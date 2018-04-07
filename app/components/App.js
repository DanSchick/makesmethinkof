import React from 'react';
import PropTypes from 'prop-types';
import { footer } from '../styles/footer.scss';
// import { app } from '../styles/app.scss';
import { overlay } from '../styles/app.scss';
import Routes from '../routes';

const App = () => {
    return (
    <div className={`${overlay} d-flex flex-column p-4`}>
        <div className={'row justify-content-center align-items-center text-center'}>
            { Routes }
        </div>
        <div className={'row p-1'}>
            <footer className={footer}>
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
