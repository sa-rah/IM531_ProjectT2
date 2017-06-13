import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

const styles = {
  element: {
    padding: 10,
    display: 'flex',
    fontSize: '0.8em',
    marginBottom: 20,
  },
  track: {
    flex: 1,
    paddingLeft: 20,
  },
  time: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackLine: {
    margin: 5,
    fontWeight: 'normal',
  },
};
export default class GameCard extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    price: PropTypes.string,
  };

  render() {
    return (
        <Paper style={styles.element}>
            <div style={styles.time}>
                {this.props.price}
            </div>
            <h2 style={styles.trackLine}>
                {this.props.name}
            </h2>
        </Paper>
    );
  }


}
