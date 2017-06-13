import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RaisedButton as Button } from 'material-ui';
import { loadLists, loadGamesForList } from '../actions';
import ListCard from '../components/ListCard';
import GameCard from '../components/GameCard';


@connect(store => ({
  lists: store.general.lists,
  empty: store.general.lists.empty,
  user: store.user.user_data,
  displayLists: store.general.displayLists,
  current_games: store.general.current_games,
}))

export default class Lists extends React.Component {
  constructor(props) {
    super(props);

    this.loadListGames = this.loadListGames.bind(this);
    this.loadLists = this.loadLists.bind(this);
  }

  static propTypes = {
    lists: PropTypes.array,
    current_games: PropTypes.array,
    dispatch: PropTypes.func,
    empty: PropTypes.bool,
    user: PropTypes.object,
    displayLists: PropTypes.bool,
  };

  componentWillMount() {
    this.props.dispatch(loadLists(this.props.user));
  }

  loadListGames(id) {
    this.props.dispatch(loadGamesForList(id, this.props.user));
  }

  loadLists() {
    this.props.dispatch(loadLists(this.props.user));
  }

  render() {
    const lists = this.props.lists;
    let visual;
    if (!this.props.displayLists) {
      const games = this.props.current_games;
      visual = <div><h3>Games</h3><ul>
          {games.map((item, index) =>
              <GameCard {...item} key={index}/>)
          }
          </ul>
        <Button type="back" value="Back" label="Back" onTouchTap={this.loadLists} /></div>;
    } else {
      visual = <div>
          <h3>Your Lists: </h3>
          <Button type="add" value="Add" label="Add List" onTouchTap={console.log('add')} />
          <ul>
              {lists.map((item, index) =>
                  <ListCard {...item} key={index} loadGames={this.loadListGames}/>)
              }
          </ul>
        </div>;
    }

    return visual;
  }
}
