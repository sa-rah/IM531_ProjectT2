import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { RaisedButton as Button } from 'material-ui';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { registerUser, showLoginForm } from './auth_actions';

const styles = {
  element: {
    position: 'fixed',
    top: 0,
    width: '100%',
    boxSizing: 'border-box',
    zIndex: 10,
    backgroundColor: '#333e50',
    bottom: 0,
  },
  h2: {
    fontSize: '1.7em',
    color: '#fff',
  },
  button: {
    margin: '25px',
    float: 'left',
  },
  formField: {
    margin: 'auto',
    width: '60%',
    maxWidth: '300px',
    marginTop: '200px',
  },
  form: {
    width: '100%',
  },
  field: {
    width: '100%',
  },
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
    this.state = { name: '', mail: '', pw: '', lists: [] };

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
          <div style={ styles.formField }>
            <h2 style={ styles.h2 }>Register</h2>
            <form style={ styles.form } onSubmit={this.handleSubmit}>
              <TextField style={ styles.field } id="name" name="name" type="text" value={this.state.name} onChange={this.handleChange} hintText="Your Name"
                         errorText="This field is required"
                         floatingLabelText="Name"/> <br/>
                <TextField style={ styles.field } id="mail" name="mail" type="text" value={this.state.mail} onChange={this.handleChange} hintText="Your Email"
                           errorText="This field is required"
                           floatingLabelText="Mail"/> <br/>
                <TextField style={ styles.field } id="pw" name="pw" type="password" value={this.state.pw} onChange={this.handleChange} hintText="Your Password"
                           errorText="This field is required"
                           floatingLabelText="Password"/> <br/>
                <Button style={styles.button} type="submit" value="Submit" label="Register" />
            </form>
            <Button style={styles.button} type="login" value="login" label="Login" onTouchTap={this.showLogForm}/>
          </div>
          </div>
    </MuiThemeProvider>
    );
  }
}
