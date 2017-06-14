/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { RaisedButton as Button } from 'material-ui';
import { setCurrentList, showEditListForm, showGames } from '../actions';

const styles = {
  element: {
    padding: 10,
    display: 'flex',
    fontSize: '0.8em',
    marginBottom: 20,
  },
  track: {
    flex: 1,
    paddingLeft: 20,
  },
};

@connect(store => ({
  displayLists: store.general.displayLists,
  current_list: store.general.current_list,
  editList: store.general.editList,
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
  };

  handleClick() {
    this.props.dispatch(setCurrentList(this.props._id));
    this.setState({
      showGames: true,
    });
  }

  editList() {
    this.props.dispatch(setCurrentList(this.props._id));
    this.setState({
      editList: true,
    });
  }

  render() {
    return <div>
            <Paper style={styles.element} onClick={this.handleClick}>
                <div style={styles.track}>
                    {this.props.name}
                </div>
            </Paper>
            <Button type="edit" value="Edit" label="Edit" onTouchTap={this.editList}/>
    </div>;
  }

  componentWillUpdate() {
    if (this.state.editList) {
      this.props.dispatch(showEditListForm(this.props._id));
    }
  }
}

