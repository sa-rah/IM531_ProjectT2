/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import GameIcon from 'material-ui/svg-icons/hardware/videogame-asset';
import _ from 'underscore-node';
import { connect } from 'react-redux';
import { asyncLoadUpdatedGamesForList } from '../actions';

const styles = {
  element: {
    padding: 10,
    display: 'flex',
    fontSize: '0.8em',
    width: '100%',
    height: '100%',
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
    platform: PropTypes.string,
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
          <GameIcon/>
            <div style={ styles.price }>
                {this.props.price}
            </div>
            <h2 style={ styles.name }>
                {this.props.name}
            </h2>
          <h3 style={ styles.platform }>{this.props.platform}</h3>
        </Paper>
    );
  }


}
