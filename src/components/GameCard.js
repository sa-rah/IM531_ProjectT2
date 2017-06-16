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
    fontSize: '1.3em',
  },
  price: {

  },
  platform: {

  },
  text: {
    width: '100%',
    textAlign: 'center',
    float: 'left',
  },
  iconWrapper: {
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
          <div style={ styles.iconWrapper }>
            <GameIcon style={ styles.icon }/>
          </div>
          <div style={ styles.text }>
              <h2 style={ styles.name }>
                  {this.props.name}
              </h2>
              <span style={ styles.price }>
                  {this.props.price} &euro;
              </span>
              <span style={ styles.platform }>Platform: {this.props.platform}</span>
          </div>
        </Paper>
    );
  }


}
