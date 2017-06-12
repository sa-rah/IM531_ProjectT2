import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

@connect(store => ({
  user: store.user,
}))

export default class Profile extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  };

  componentWillMount() {

  }

  render() {
    return <h2>Profile</h2>;
  }
}
