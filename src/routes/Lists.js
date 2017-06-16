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
    if (!displayLists) {
      visual = <div style={ { width: '100%' } }>
          <GamePart />
        </div>;
    } else {
      visual = <div style={ { width: '100%' } }>
          <ListPart />
        </div>;
    }

    return visual;
  }
}
