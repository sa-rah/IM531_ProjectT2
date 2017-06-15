import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListPart from '../components/ListPart';
import GamePart from '../components/GamePart';


@connect(store => ({
  displayLists: store.general.displayLists,
}))

export default class Lists extends React.Component {
  static propTypes = {
    displayLists: PropTypes.bool,
  };

  render() {
    const displayLists = this.props.displayLists;
    let visual;
    console.log(displayLists);
    if (!displayLists) {
      visual = <div>
          <GamePart />
        </div>;
    } else {
      visual = <div>
          <ListPart />
        </div>;
    }

    return visual;
  }
}
