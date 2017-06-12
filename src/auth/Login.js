import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RaisedButton as Button } from 'material-ui';
import { loginUser } from '../actions';

@connect(store => ({
  user: store.general.user,
  loggedIn: store.user.loggedIn,
  theme: store.general.theme,
}))

export default class Login extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    loggedIn: PropTypes.bool,
    dispatch: PropTypes.func,
    theme: PropTypes.object,
  };

  sendForm() {
    this.props.dispatch(loginUser('test'));
  }

  render() {
    const loggedIn = this.props.loggedIn;
    let view = {};
    if (loggedIn) {
      view = <Link to='/'/>;
    } else {
      view = <MuiThemeProvider muiTheme={this.props.theme}>
        <div>
        <h2>Login</h2>
        <Button primary={true} className="login-button" type="Submit" label='Login' onTouchTap={() => this.sendForm()} />
        </div>
      </MuiThemeProvider>;
    }
    return view;
  }

  componentDidUpdate() {
    console.log(this.props.loggedIn);
  }
}
