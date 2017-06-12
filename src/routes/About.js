import React from 'react';
// import PropTypes from 'prop-types';
import pkg from '../../package.json';


export default class About extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      version: pkg.version,
    };
  }

  render() {
    return <div><h2>About GameFAM ${this.state.version}</h2></div>;
  }
}
