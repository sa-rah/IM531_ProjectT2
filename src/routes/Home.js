import React from 'react';
import { Paper } from 'material-ui';

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

export default class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div>
        <Paper style={ styles.head } rounded={false} zDepth={1}>
          <h3 style={ styles.h3 }>Welcome to <span style={ styles.span }>
                gamefam</span> !
          </h3>
        </Paper>
      <div>
        <Paper>
          <h4></h4>
        </Paper>
      </div>
    </div>;
  }
}
