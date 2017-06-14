import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { RaisedButton as Button } from 'material-ui';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { registerUser, showLoginForm } from './auth_actions';

const styles = {

};

@connect(store => ({
  user: store.user.user,
  loggedIn: store.user.loggedIn,
  theme: store.general.theme,
  register: store.user.register,
}))

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', mail: '', pw: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showLogForm = this.showLogForm.bind(this);
  }

  static propTypes = {
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
    this.props.dispatch(registerUser(this.state));
  }

  showLogForm() {
    this.props.dispatch(showLoginForm(this.props.register));
  }

  render() {
    return (
    <MuiThemeProvider muiTheme={this.props.theme}>
        <div style={{
          ...styles.element,
          backgroundColor: this.props.theme.palette.primary1Color,
        }}>
            <h2>Register</h2>
            <form onSubmit={this.handleSubmit}>
              <TextField id="name" name="name" type="text" value={this.state.name} onChange={this.handleChange} hintText="Your Name"
                         errorText="This field is required"
                         floatingLabelText="Name"/> <br/>
                <TextField id="mail" name="mail" type="text" value={this.state.mail} onChange={this.handleChange} hintText="Your Email"
                           errorText="This field is required"
                           floatingLabelText="Mail"/> <br/>
                <TextField id="pw" name="pw" type="password" value={this.state.pw} onChange={this.handleChange} hintText="Your Password"
                           errorText="This field is required"
                           floatingLabelText="Password"/> <br/>
                <Button type="submit" value="Submit" label="Register" />
            </form>
            <Button type="login" value="login" label="Login" onTouchTap={this.showLogForm}/>
        </div>
    </MuiThemeProvider>
    );
  }
}
