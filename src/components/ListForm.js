/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { RaisedButton as Button, AutoComplete, Paper, IconButton as DeleteButton } from 'material-ui';
import { showLists, asyncAdding, asyncEditing, asyncDeleting, loadAllUser } from '../actions';

const styles = {
  head: {
    width: '100%',
    backgroundColor: '#27c79a',
    padding: '16px',
    height: '70px',
  },
  button: {
    float: 'right',
    backgroundColor: '#333e50',
  },
  h3: {
    float: 'left',
    lineHeight: 1,
    margin: 10,
    textTransform: 'lowercase',
    letterSpacing: '0.1em',
    color: '#333e50',
  },
  span: {
    color: '#27c79a',
    fontWeight: 'bold',
    textTransform: 'lowercase',
    fontSize: '1.2em',
    lineHeight: '2.5',
  },
  form: {
    margin: 'auto',
    width: '300px',
  },
  innerForm: {
    padding: '20px',
    color: '#333e50',
  },
  field: {
    marginTop: '25px',
  },
  innerField: {
    color: '#333e50',
  },
  autoField: {
    borderColor: '#333e50',
  },
  buttonAdd: {
    marginTop: '50px',
    backgroundColor: '#333e50',
    margin: '20px',
    textAlign: 'center',
    float: 'left',
    width: '100%',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  deleteButton: {
    margin: '10px',
    width: '20px',
    height: '20px',
  },
  deleteIcon: {
    fill: '#27c79a',
    color: '#27c79a',
  },
  user: {
    float: 'left',
  },
};

@connect(store => ({
  user: store.user.user_data,
  lists: store.general.lists,
  current_list: store.general.current_list,
  editList: store.general.editList,
  fetching: store.general.fetching,
  users: store.general.users,
}))

export default class ListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', users: [], games: [], dataSource: [], inputValue: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showLists = this.showLists.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.onSetUser = this.onSetUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  static propTypes = {
    dispatch: PropTypes.func,
    sendForm: PropTypes.func,
    user: PropTypes.object,
    lists: PropTypes.array,
    current_list: PropTypes.object,
    editList: PropTypes.bool,
    fetching: PropTypes.bool,
    users: PropTypes.array,
  };

  componentWillMount() {
    this.props.dispatch(loadAllUser());
    const currentList = this.props.current_list;
    if (this.props.editList) {
      this.setState({
        name: currentList.name,
        users: currentList.users,
        games: currentList.games,
      });
    }
  }

  onUpdateInput(inputValue) {
    const self = this;
    this.setState({
      inputValue,
    }, () => {
      self.performSearch();
    });
  }

  performSearch() {
    if (this.state.inputValue !== '') {
      const mails = this.props.users.map(user => user.mail);
      this.setState({
        dataSource: mails,
      });
    }
  }

  onSetUser(chosenRequest) {
    const newUsers = this.props.users;
    const newUser = newUsers.find(user => user.mail === chosenRequest);
    newUsers.push(newUser);
    const stateUsers = this.state.users;
    stateUsers.push(newUser._id);
    this.setState({
      users: stateUsers,
    });
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
      list: {
        name: this.state.name,
        users: this.state.users,
        games: this.state.games,
      },
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

  removeUser(item) {
    const updateUsers = this.state.users;
    const index = updateUsers.indexOf(item);
    updateUsers.splice(index, 1);
    this.setState({
      users: updateUsers,
    });
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
          <Paper style={ styles.head } rounded={false} zDepth={1}>
            <Button style={ styles.button } type="back"
                    backgroundColor={ styles.button.backgroundColor }
                    value="Back" label="Back"
                    onTouchTap={this.showLists}/>
            <h3 style={ styles.h3 }>{ this.props.editList ? 'Edit List' : 'Add new List' }</h3>
          </Paper>
          <div style={ styles.form }>
            <form style={ styles.innerForm }>
              <span style={styles.span}>Name: </span>
                <TextField id="name" name="name" type="text"
                           inputStyle={ styles.innerField }
                           value={this.state.name}
                           onChange={this.handleChange} hintText="List Name"
                           errorText="This field is required"
                           floatingLabelText="List Name"/> <br/>
              <span style={styles.span}>User: </span>
                <AutoComplete id="user" name="user"
                              style={ styles.field }
                              inputStyle={ styles.innerField }
                              underlineStyle={ styles.autoField }
                              dataSource={this.state.dataSource}
                              onUpdateInput={this.onUpdateInput} onNewRequest={this.onSetUser}/>
              <span style={styles.span}>Added User: </span>
              <ul style={ styles.list }>
                  { this.state.users.map((item, index) =>
                      <li key={index}><p style={ styles.user }> {item}</p>
                        <DeleteButton type="remove" value="remove" id={item}
                                      style={ styles.deleteIcon }
                                      iconStyle={ styles.deleteIcon }
                                      onTouchTap={this.removeUser.bind(this, item)}>
                                      <DeleteIcon style={ styles.deleteIcon }/>
                        </DeleteButton>
                      </li>) }
              </ul>
            </form>
            <Button type="submit" value="Submit"
                    style={ styles.buttonAdd }
                    label={ this.props.editList ? 'Edit' : 'Add List' }
                    onTouchTap={this.handleSubmit}/>
              { this.props.editList ? <Button type="delete" value="Delete"
                                                    style={ styles.buttonAdd }
                                                    label="Delete List"
                                                    onTouchTap={this.deleteList} /> : null }
          </div>
        </div>
    );
  }


}
