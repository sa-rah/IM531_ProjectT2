import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { RaisedButton as Button } from 'material-ui';
import { showLists, addToList } from '../actions';

@connect(store => ({
  user: store.user.user_data,
  lists: store.general.lists,
}))

export default class ListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', users: [], games: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showLists = this.showLists.bind(this);
  }

  static propTypes = {
    dispatch: PropTypes.func,
    sendForm: PropTypes.func,
    user: PropTypes.object,
    lists: PropTypes.array,
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
    const updateList = this.props.lists;
    updateList.push(this.state);
    const obj = {
      user: this.props.user,
      lists: updateList,
      list: this.state,
    };
    this.props.dispatch(addToList(obj));
  }

  showLists() {
    this.props.dispatch(showLists(this.props));
  }

  render() {
    return (
        <div>
          <Button type="back" value="Back" label="Back" onTouchTap={this.showLists}/>
          <h2>Add new List: </h2>
            <form onSubmit={this.handleSubmit}>
                <TextField id="name" name="name" type="text" value={this.state.name} onChange={this.handleChange} hintText="List Name"
                           errorText="This field is required"
                           floatingLabelText="List Name"/> <br/>
                <Button type="submit" value="Submit" label="Add List" />
            </form>
        </div>
    );
  }


}
