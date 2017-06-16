/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { RaisedButton as Button, Avatar } from 'material-ui';
import ProfileIcon from 'material-ui/svg-icons/social/person';
import { showEditListForm, asyncLoadGamesForList } from '../actions';

const styles = {
  element: {
    padding: 25,
    paddingBottom: 0,
    display: 'flex',
    fontSize: '0.8em',
    height: '75px',
  },
  paper: {
    width: '100%',
    padding: 10,
  },
  h3: {
    float: 'left',
    color: '#27c79a',
    textTransform: 'lowercase',
    letterSpacing: '0.1em',
    fontWeight: '500',
    marginLeft: '15px',
    lineHeight: 1.5,
    fontSize: '1.3em',
  },
  list: {
    float: 'right',
    marginRight: '15px',
  },
  users: {
    margin: '8px',
  },
  button: {
    background: 'none',
    boxShadow: 'none',
    height: '100%',
  },
};

@connect(store => ({
  displayLists: store.general.displayLists,
  current_list: store.general.current_list,
  editList: store.general.editList,
  fetching: store.general.fetching,
  user: store.user.user,
}))

export default class ListCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { editList: this.props.editList, showGames: false };

    this.handleClick = this.handleClick.bind(this);
    this.editList = this.editList.bind(this);
  }

  static propTypes = {
    name: PropTypes.string,
    _id: PropTypes.string,
    dispatch: PropTypes.func,
    editList: PropTypes.bool,
    displayLists: PropTypes.bool,
    fetching: PropTypes.bool,
    user: PropTypes.object,
    users: PropTypes.array,
  };

  handleClick() {
    this.props.dispatch(asyncLoadGamesForList(this.props._id));
  }

  editList() {
    this.props.dispatch(showEditListForm(this.props._id));
  }

  render() {
    return <div style={ styles.element }>
            <Paper style={styles.paper} onClick={this.handleClick}>
                <h3 style={styles.h3}>
                    {this.props.name}
                </h3>
              <ul style={ styles.list }>
                  {this.props.users.map((item, index) =>
                      <Avatar style={ styles.users } icon={<ProfileIcon/>} key={index} />)
                  }
              </ul>
            </Paper>
            <Button style={ styles.button } type="edit" value="Edit"
                    label="Edit"
                    onTouchTap={this.editList}/>
    </div>;
  }
}

