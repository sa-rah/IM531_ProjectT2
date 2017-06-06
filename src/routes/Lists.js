import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadLists } from '../actions';
import ListCard from '../components/ListCard';


@connect(store => ({
  lists: store.lists,
  empty: store.lists.empty,
}))
export default class Lists extends React.Component {
  static propTypes = {
    lists: PropTypes.object,
    dispatch: PropTypes.func,
    empty: PropTypes.bool,
  };

  componentWillMount() {
    this.props.dispatch(loadLists(this.props.lists));
  }

  render() {
    const lists = this.props.lists;
    const result = Object.keys(lists).map(e => [lists[e]]);
    console.log(result);
    return <div>
      <h3>Your Lists: </h3>
      <ul>
          {result.map((item, index) => <ListCard {...item} key={index} />) }
      </ul>
        </div>;
  }
}
