/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import ListCard from '../components/ListCard';


@connect(store => ({
  lists: store.lists,
  empty: store.lists.empty,
}))
export default class Lists extends React.Component {
  static propTypes = {
    lists: PropTypes.object,
    empty: PropTypes.bool,
  };

  render() {
    const lists = this.props.lists.gamelists;
    console.log(lists);
    return <div>
      <p>Lists</p>
      <ul>
        {lists}
      </ul>
        </div>;
  }
}
