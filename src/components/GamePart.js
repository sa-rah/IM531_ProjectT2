import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RaisedButton as Button } from 'material-ui';
import GameCard from '../components/GameCard';


@connect(store => ({
  current_list: store.general.current_list,
  empty: store.general.lists.empty,
  user: store.user.user_data,
}))

export default class Lists extends React.Component {

  constructor(props) {
    super(props);

    this.lo
  }

  static propTypes = {
    dispatch: PropTypes.func,
    empty: PropTypes.bool,
    user: PropTypes.object,
    displayLists: PropTypes.bool,
    current_list: PropTypes.object,
  };

  componentWillMount() {

  }

  loadListGames() {
  }

  render() {
    // const games = this.props.current_list.games;
    const visual = <div><h3>Games</h3><ul>

        </ul>
            <Button type="back" value="Back" label="Back" onTouchTap={this.loadLists} /></div>;

    return visual;
  }

}
