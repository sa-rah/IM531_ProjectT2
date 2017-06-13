import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { RaisedButton as Button } from 'material-ui';

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', mail: '', pw: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    dispatch: PropTypes.func,
    sendForm: PropTypes.func,
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
    this.props.sendForm(this.state);
  }

  render() {
    return (
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
    );
  }
}
