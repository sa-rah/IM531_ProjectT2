import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HashRouter as Router,
    Route } from 'react-router-dom';
import Login from './auth/Login';
import App from './App.jsx';

@connect(store => ({
  loggedIn: store.user.loggedIn,
}))

export default class Home extends React.Component {

  static propTypes = {
    loggedIn: PropTypes.bool,
  };

  render() {
    return <div>
      <Router history={history}>
        <Route path="/" render={() => (
            this.props.loggedIn ? (
                <App/>
            ) : (
                <Login/>
            )
        )} />
      </Router>
    </div>;
  }
}

