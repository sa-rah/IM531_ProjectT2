import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { RaisedButton as Button } from 'material-ui';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { loginUser, showRegisterForm } from './auth_actions';

const styles = {

};

@connect(store => ({
  user: store.user.user,
  loggedIn: store.user.loggedIn,
  theme: store.general.theme,
  register: store.user.register,
}))

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mail: '', pw: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showRegForm = this.showRegForm.bind(this);
  }

  static propTypes = {
    user: PropTypes.object,
    loggedIn: PropTypes.bool,
    dispatch: PropTypes.func,
    theme: PropTypes.object,
    register: PropTypes.bool,
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(loginUser(this.state));
  }

  showRegForm() {
    this.props.dispatch(showRegisterForm(this.props.register));
  }

  render() {
    return (
        <MuiThemeProvider muiTheme={this.props.theme}>
      <div style={{
        ...styles.element,
        backgroundColor: this.props.theme.palette.primary1Color,
      }}>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <TextField id="mail" name="mail" type="text" value={this.state.mail} onChange={this.handleChange} hintText="Your Email"
                     errorText="This field is required"
                     floatingLabelText="Mail"/> <br/>
          <TextField id="pw" name="pw" type="password" value={this.state.pw} onChange={this.handleChange} hintText="Your Password"
                     errorText="This field is required"
                     floatingLabelText="Password"/> <br/>
          <Button type="submit" value="Submit" label="Login" />
        </form>
        <Button type="register" value="register" label="Register" onTouchTap={this.showRegForm}/>
      </div>
    </MuiThemeProvider>

    );
  }
}
