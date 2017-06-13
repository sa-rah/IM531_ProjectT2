import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { RaisedButton as Button } from 'material-ui';

export default class ListForm extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    price: PropTypes.string,
  };

  render() {
    return (
            <form onSubmit={this.handleSubmit}>
                <TextField id="mail" name="mail" type="text" value={this.state.mail} onChange={this.handleChange} hintText="Your Email"
                           errorText="This field is required"
                           floatingLabelText="Mail"/> <br/>
                <TextField id="pw" name="pw" type="text" value={this.state.pw} onChange={this.handleChange} hintText="Your Password"
                           errorText="This field is required"
                           floatingLabelText="Password"/> <br/>
                <Button type="submit" value="Submit" label="Login" />
            </form>
    );
  }


}
