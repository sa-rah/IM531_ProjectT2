import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginForm from './LoginForm';
import { loginUser } from './auth_actions';

const styles = {

};

@connect(store => ({
  user: store.user.user,
  loggedIn: store.user.loggedIn,
  theme: store.general.theme,
}))

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form_data: {
        mail: '',
        pw: '',
      },
    };

    this.updateFormData = this.updateFormData.bind(this);
  }

  static propTypes = {
    user: PropTypes.object,
    loggedIn: PropTypes.bool,
    message: PropTypes.string,
    dispatch: PropTypes.func,
    theme: PropTypes.object,
  };

  updateFormData(values) {
    console.log(values);
    this.setState(
      { form_data: {
        mail: values.mail,
        pw: values.pw,
      } });
  }

  sendForm() {
    this.props.dispatch(loginUser(this.state.form_data));
  }


  render() {
    const loggedIn = this.props.loggedIn;
    let view = {};
    if (loggedIn) {
      view = <Link to='/'/>;
    } else {
      view = <MuiThemeProvider muiTheme={this.props.theme}>
        <div style={{
          ...styles.element,
          backgroundColor: this.props.theme.palette.primary1Color,
        }}>
          <h2>Login</h2>
          <LoginForm sendForm={this.updateFormData}/>
        </div>
      </MuiThemeProvider>;
    }
    return view;
  }

  componentDidUpdate() {
    this.sendForm();
  }
}
