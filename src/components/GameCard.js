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
    width: '100%',
    height: '100%',
  },
  icon: {
    width: '75px',
    height: '75px',
    fill: '#f6df80',
  },
  name: {
    fontWeight: '600',
    textTransform: 'capitalize',
    color: '#27c79a',
    fontSize: '1em',
    margin: 0,
  },
  price: {
    color: '#df8671',
    width: '100%',
    margin: 0,
    fontWeight: '500',
    fontSize: '1em',
  },
  platform: {
    width: '100%',
    margin: 0,
    fontSize: '0.8em',
  },
  text: {
    width: '100%',
    textAlign: 'center',
    float: 'left',
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
          <div style={ styles.text }>
            <GameIcon style={ styles.icon }/>
              <h2 style={ styles.name }>
                  {this.props.name}
              </h2>
            <p style={ styles.price }>
              <span>
                  {this.props.price} &euro;
              </span>
            </p>
            <p style={ styles.platform }>
              <span>Platform: {this.props.platform}</span>
            </p>
          </div>
        </Paper>
    );
  }


}
