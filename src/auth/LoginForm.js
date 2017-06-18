/* eslint-disable no-useless-escape */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { RaisedButton as Button, Paper } from 'material-ui';
import GameFamIcon from 'material-ui/svg-icons/social/pages';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { loginUser, showRegisterForm, setErrorMessage } from './auth_actions';

const styles = {
  element: {
    position: 'fixed',
    top: 0,
    width: '100%',
    boxSizing: 'border-box',
    zIndex: 10,
    backgroundColor: '#27c79a',
    bottom: 0,
  },
  h2: {
    fontSize: '1.4em',
    color: '#fff',
    fontWeight: '600',
  },
  button: {
    width: '100%',
    float: 'left',
    marginTop: '40px',
  },
  buttonReg: {
    width: '100%',
    float: 'left',
    marginTop: '20px',
    backgroundColor: '#333e50',
  },
  formField: {
    margin: 'auto',
    width: '60%',
    maxWidth: '300px',
    marginTop: '50px',
  },
  form: {
    width: '100%',
  },
  field: {
    width: '100%',
  },
  headline: {
    width: '100%',
    margin: 'auto',
    textAlign: 'center',
    backgroundColor: '#27c79a',
  },
  h1: {
    fontSize: '1.5em',
    color: '#333e50',
    paddingBottom: '50px',
    textTransform: 'lowercase',
  },
  span: {
    color: '#fff',
    letterSpacing: '0.1em',
  },
  h4: {
    color: '#df8671',
    margin: 0,
  },
  icon: {
    width: '50px',
    height: '50px',
    margin: 'auto',
    marginTop: '50px',
  },
};

@connect(store => ({
  user: store.user.user,
  loggedIn: store.user.loggedIn,
  theme: store.general.theme,
  register: store.user.register,
  message: store.user.message,
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
    message: PropTypes.array,
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
    const correctInput = [false, false, false];
    const regex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
    const mailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    correctInput[0] = mailRegex.test(this.state.mail);
    correctInput[1] = regex.test(this.state.pw);

    const msg = [];

    if (!correctInput[0]) {
      msg.push('Mail is not valid.');
    }

    if (!correctInput[1]) {
      msg.push('Password is not valid.');
    }

    if (msg.length === 0) {
      this.props.dispatch(loginUser(this.state));
    } else {
      this.props.dispatch(setErrorMessage(msg));
    }
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
        <Paper style={ styles.headline } rounded={false}>
          <GameFamIcon style={ styles.icon }/>
          <h1 style={ styles.h1 }>Welcome to <span style={styles.span}>gamefam</span> !</h1>
        </Paper>
        <div style={ styles.formField }>
        <h2 style={ styles.h2 }>Login</h2>
            { this.props.message ? this.props.message.map((item, index) =>
                <h4 style={ styles.h4 } key={index}> { item }</h4>) : null}
        <form style={ styles.form } onSubmit={this.handleSubmit}>
          <TextField style={ styles.field } id="mail" name="mail" type="text" value={this.state.mail} onChange={this.handleChange} hintText="Your Email"
                     floatingLabelText="Mail"/> <br/>
          <TextField style={ styles.field } id="pw" name="pw" type="password" value={this.state.pw} onChange={this.handleChange} hintText="Your Password"
                     floatingLabelText="Password"/> <br/>
          <Button style={styles.button} type="submit" value="Submit" label="Login" />
        </form>
          <Button style={styles.buttonReg}
                  backgroundColor={ styles.buttonReg.backgroundColor }
                  type="register" value="register" label="Register" onTouchTap={this.showRegForm}/>
      </div>
      </div>
    </MuiThemeProvider>

    );
  }
}
