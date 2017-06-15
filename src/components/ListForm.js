/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { RaisedButton as Button } from 'material-ui';
import { showLists, asyncAdding, asyncEditing, asyncDeleting } from '../actions';

@connect(store => ({
  user: store.user.user_data,
  lists: store.general.lists,
  current_list: store.general.current_list,
  editList: store.general.editList,
  fetching: store.general.fetching,
}))

export default class ListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', users: [], games: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showLists = this.showLists.bind(this);
    this.deleteList = this.deleteList.bind(this);
  }

  static propTypes = {
    dispatch: PropTypes.func,
    sendForm: PropTypes.func,
    user: PropTypes.object,
    lists: PropTypes.array,
    current_list: PropTypes.object,
    editList: PropTypes.bool,
    fetching: PropTypes.bool,
  };

  componentWillMount() {
    const currentList = this.props.current_list;
    if (this.props.editList) {
      this.setState({
        name: currentList.name,
        users: currentList.users,
        games: currentList.games,
      });
    }
  }

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
      id: this.props.current_list._id,
    };
    if (this.props.editList) {
      this.props.dispatch(asyncEditing(obj));
    } else {
      this.props.dispatch(asyncAdding(obj));
    }
  }

  showLists() {
    this.props.dispatch(showLists());
  }

  deleteList() {
    const obj = {
      user: this.props.user,
      id: this.props.current_list._id,
    };
    this.props.dispatch(asyncDeleting(obj));
  }

  render() {
    return (
        <div>
          <Button type="back" value="Back" label="Back" onTouchTap={this.showLists}/>
          <h2>{ this.props.editList ? 'Edit List' : 'Add new List' }</h2>
            <form onSubmit={this.handleSubmit}>
                <TextField id="name" name="name" type="text" value={this.state.name} onChange={this.handleChange} hintText="List Name"
                           errorText="This field is required"
                           floatingLabelText="List Name"/> <br/>
                <Button type="submit" value="Submit" label={ this.props.editList ? 'Edit' : 'Add List' } />
            </form>
            { this.props.editList ? <Button type="delete" value="Delete" label="Delete List" onTouchTap={this.deleteList} /> : null }
        </div>
    );
  }


}
