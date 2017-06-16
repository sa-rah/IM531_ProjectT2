import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { RaisedButton as Button, Paper } from 'material-ui';
import GameFamIcon from 'material-ui/svg-icons/social/pages';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { loginUser, showRegisterForm } from './auth_actions';

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
    fontSize: '1.2em',
    color: '#fff',
  },
  button: {
    margin: '40px',
    float: 'left',
  },
  formField: {
    margin: 'auto',
    width: '60%',
    maxWidth: '300px',
    marginTop: '150px',
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
  },
  h4: {
    color: '#df8671',
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
    message: PropTypes.string,
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
        <Paper style={ styles.headline } rounded={false}>
          <GameFamIcon style={ styles.icon }/>
          <h1 style={ styles.h1 }>Welcome to gamefam!</h1>
        </Paper>
        <Button style={styles.button} type="register" value="register" label="Register" onTouchTap={this.showRegForm}/>
        <div style={ styles.formField }>
        <h2 style={ styles.h2 }>Login</h2>
            { this.props.message ? <h4 style={ styles.h4 }>{ this.props.message }</h4> : null}
        <form style={ styles.form } onSubmit={this.handleSubmit}>
          <TextField style={ styles.field } id="mail" name="mail" type="text" value={this.state.mail} onChange={this.handleChange} hintText="Your Email"
                     floatingLabelText="Mail"/> <br/>
          <TextField style={ styles.field } id="pw" name="pw" type="password" value={this.state.pw} onChange={this.handleChange} hintText="Your Password"
                     floatingLabelText="Password"/> <br/>
          <Button style={styles.button} type="submit" value="Submit" label="Login" />
        </form>
      </div>
      </div>
    </MuiThemeProvider>

    );
  }
}
