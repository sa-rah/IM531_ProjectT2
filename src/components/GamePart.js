/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RaisedButton as Button, CircularProgress, Paper, GridList, GridTile } from 'material-ui';
import { showLists, showGameForm } from '../actions';
import GameCard from '../components/GameCard';
import GameForm from '../components/GameForm';

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
    marginRight: '10px',
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
    marginTop: '70px',
  },
  list: {
    paddingLeft: 0,
    marginTop: 25,
  },
  autoField: {
    borderColor: '#333e50',
  },
  form: {
    margin: 'auto',
    width: '300px',
  },
  games: {
    padding: 25,
  },
  innerForm: {
    padding: '20px',
    color: '#333e50',
  },
  field: {
    margin: 0,
    padding: 0,
  },
  innerField: {
    color: '#333e50',
  },
  hintField: {
    color: '#27c79a',
  },
  buttonAdd: {
    margin: '30px 0',
    textAlign: 'center',
    width: '100%',
    float: 'left',
  },
  spanNote: {
    float: 'left',
    lineHeight: 1,
    textTransform: 'lowercase',
    letterSpacing: '0.1em',
    color: '#fff',
    fontSize: '1em',
    fontWeight: '600',
  },
  tile: {

  },
  note: {
    height: '50px',
    display: 'inline-block',
    marginTop: '10px',
    marginBottom: '10px',
    width: '100%',
  },
  noteHL: {
    textAlign: 'center',
    textTransform: 'lowercase',
    letterSpacing: '0.1em',
    color: '#df8671',
  },
};

@connect(store => ({
  current_list: store.general.current_list,
  empty: store.general.lists.empty,
  fetching: store.general.fetching,
  gameForm: store.general.gameForm,
}))

export default class Lists extends React.Component {

  constructor(props) {
    super(props);

    this.showUserLists = this.showUserLists.bind(this);
    this.showAddGameForm = this.showAddGameForm.bind(this);
  }

  static propTypes = {
    dispatch: PropTypes.func,
    empty: PropTypes.bool,
    current_list: PropTypes.object,
    _id: PropTypes.string,
    fetching: PropTypes.bool,
    gameForm: PropTypes.bool,
  };

  showUserLists() {
    this.props.dispatch(showLists());
  }

  showAddGameForm() {
    this.props.dispatch(showGameForm());
  }

  render() {
    const games = this.props.current_list.games;
    const name = this.props.current_list.name;
    const visual = <div>
        { this.props.gameForm ? <GameForm /> :
            <div>
              <Paper style={ styles.head } rounded={false} zDepth={1}>
                <Button style={ styles.button }
                        backgroundColor={ styles.button.backgroundColor }
                        type="back" value="Back"
                        label="Add Game" onTouchTap={this.showAddGameForm} />
                <Button style={ styles.button }
                        backgroundColor={ styles.button.backgroundColor }
                        type="back" value="Back"
                        label="Back" onTouchTap={this.showUserLists} />
                <h3 style={ styles.h3 }><span style={ styles.span }>{ name }</span> - Games
                </h3>
              </Paper>
              <div style={ styles.games }>
                <div style={ styles.note }>
                <h3 style={ styles.noteHL }>Tap on game to remove it.</h3>
                </div>
                  {this.props.fetching ?
                      <div ><CircularProgress style={ styles.loading }/></div> :
                      <GridList style={ styles.list }>
                          {games.map((item, index) =>
                            <GridTile style={ styles.tile } key={index} >
                                <GameCard {...item} key={index}/>
                            </GridTile>)
                          }
                      </GridList>
                  }
              </div>
            </div> }
    </div>;

    return visual;
  }

}
