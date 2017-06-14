import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

@connect(store => ({
  user: store.user.user,
  loggedIn: store.user.loggedIn,
  theme: store.general.theme,
  register: store.user.register,
}))

export default class Login extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    loggedIn: PropTypes.bool,
    message: PropTypes.string,
    dispatch: PropTypes.func,
    theme: PropTypes.object,
    register: PropTypes.bool,
  };

  render() {
    const loggedIn = this.props.loggedIn;
    const register = this.props.register;
    let view = {};
    if (loggedIn) {
      view = <Link to='/'/>;
    } else if (register) {
      view = <RegistrationForm/>;
    } else {
      view = <LoginForm/>;
    }
    return view;
  }
}
