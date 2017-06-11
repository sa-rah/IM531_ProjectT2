import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadLists } from '../actions';
import ListCard from '../components/ListCard';


@connect(store => ({
  lists: store.lists,
  empty: store.lists.empty,
  user: store.user,
}))

export default class Lists extends React.Component {
  static propTypes = {
    lists: PropTypes.array,
    dispatch: PropTypes.func,
    empty: PropTypes.bool,
    user: PropTypes.object,
  };

  componentWillMount() {
    this.props.dispatch(loadLists(this.props.user));
  }

  render() {
    const lists = this.props.lists;
    // const result = Object.keys(lists).map(e => [lists[e]]);
    return <div>
      <h3>Your Lists: </h3>
      <ul>
          {lists.map((item, index) => <ListCard {...item} key={index} />) }
      </ul>
        </div>;
  }
}
