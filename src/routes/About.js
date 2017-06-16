import React from 'react';
import { Paper } from 'material-ui';
import pkg from '../../package.json';

const styles = {
  head: {
    width: '100%',
    backgroundColor: '#27c79a',
    padding: '16px',
    height: '70px',
  },
  button: {
    float: 'right',
    backgroundColor: '#333e50',
  },
  h3: {
    float: 'left',
    lineHeight: 1,
    margin: 10,
    textTransform: 'lowercase',
    letterSpacing: '0.1em',
  },
  span: {
    color: '#333e50',
    fontWeight: 'bold',
  },
  loading: {
    fill: '#27c79a',
    color: '#27c79a',
    textAlign: 'center',
    margin: 'auto',
    width: '100%',
  },
  list: {
    paddingLeft: 0,
    marginTop: 25,
  },
};

export default class About extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      version: pkg.version,
    };
  }

  render() {
    return <div>
        <Paper style={ styles.head } rounded={false} zDepth={1}>
          <h3 style={ styles.h3 }>About <span style={ styles.span }>
                gamefam</span> - { this.state.version }
          </h3>
        </Paper>
    </div>;
  }
}
