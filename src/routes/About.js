import React from 'react';
import { Paper } from 'material-ui';
import GameFamIcon from 'material-ui/svg-icons/social/pages';
import pkg from '../../package.json';

const styles = {
  head: {
    width: '100%',
    backgroundColor: '#27c79a',
    padding: '16px',
    height: '70px',
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
  h4: {
    textTransform: 'lowercase',
    letterSpacing: '0.1em',
    color: '#df8671',
  },
  spanAbout: {
    color: '#27c79a',
  },
  container: {
    margin: 25,
    marginTop: 50,
    padding: 20,
    lineHeight: '1.4em',
  },
  icon: {
    width: 50,
    height: 50,
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
      <Paper style={styles.container}>
        <GameFamIcon style={ styles.icon }/>
        <p>
          <span style={ styles.spanAbout }>Developer:</span> Sarah S.<br/>
          <span style={ styles.spanAbout }>Contact:</span> sarah.sauseng@gmail.com<br/>
          <span style={ styles.spanAbout }>Version:</span> {this.state.version}
        </p>
        <h3 style={ styles.h4 }>Informations</h3>
        <p>
          This application is an alpha version of gamefam and still in work.
          For further information about this product, please contact me.
        </p>
      </Paper>
    </div>;
  }
}
