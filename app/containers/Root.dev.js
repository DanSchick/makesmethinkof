import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import {Route} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';

import { overlay } from '../styles/app.scss';

import AppContainer from '../containers/AppContainer';
// import DevTools from './DevTools';

export default function Root({store, history}) {
    return (
        <Provider store={store}>
            <div className={`${overlay}`}>
                <ConnectedRouter history={history}>
                    <Route path="/" component={AppContainer}/>
                </ConnectedRouter>
                {/* <DevTools /> */}
            </div>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
