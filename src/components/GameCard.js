/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import _ from 'underscore-node';
import { connect } from 'react-redux';
import { asyncLoadUpdatedGamesForList } from '../actions';

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
  time: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackLine: {
    margin: 5,
    fontWeight: 'normal',
  },
};

@connect(store => ({
  current_list: store.general.current_list,
}))

export default class GameCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { };

    this.handleClick = this.handleClick.bind(this);
  }

  static propTypes = {
    name: PropTypes.string,
    price: PropTypes.string,
    id: PropTypes.string,
    dispatch: PropTypes.func,
    current_list: PropTypes.object,
  };

  handleClick() {
    let newGames = this.props.current_list.games;
    newGames = _.without(newGames, _.findWhere(newGames, {
      id: this.props.id,
    }));
    const obj = {
      delete: true,
      list: this.props.current_list,
      id: this.props.id,
      games: newGames,
    };
    this.props.dispatch(asyncLoadUpdatedGamesForList(obj));
  }

  render() {
    return (
        <Paper style={styles.element} onClick={this.handleClick}>
            <div style={styles.time}>
                {this.props.price}
            </div>
            <h2 style={styles.trackLine}>
                {this.props.name}
            </h2>
        </Paper>
    );
  }


}
