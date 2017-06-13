import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { RaisedButton as Button } from 'material-ui';

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
};

export default class ListCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    index: PropTypes.string,
    loadGames: PropTypes.func,
  };

  handleClick() {
    this.props.loadGames(this.props.id);
  }

  render() {
    return <div>
            <Paper style={styles.element} onClick={this.handleClick}>
                <div style={styles.track}>
                    {this.props.name}
                </div>
            </Paper>
            <Button type="edit" value="Edit" label="Edit" onTouchTap={console.log('Edit')}/></div>;
  }
}

