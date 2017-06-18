/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';
import thunk from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import Home from './Home.jsx';
import reducer from './reducer/reducers';
import userReducer from './reducer/userReducers';
import './swRegister';
import './styles.css';

injectTapEventPlugin();

const root = document.querySelector('#root');
const middleware = applyMiddleware(promiseMiddleware(), loggerMiddleware, thunk);

const reducers = combineReducers({
  user: userReducer,
  general: reducer,
});

const store = createStore(
    reducers,
    middleware,
);

const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Home/>
        </Router>
    </Provider>,
    root,
);
