import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { RaisedButton as Button, Paper } from 'material-ui';
import { asyncLoadUpdatedGamesForList, showGames } from '../actions';


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
  spanForm: {
    color: '#27c79a',
    fontWeight: 'bold',
    textTransform: 'lowercase',
    fontSize: '1.2em',
    lineHeight: '2.5',
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
};

@connect(store => ({
  current_list: store.general.current_list,
  empty: store.general.lists.empty,
  fetching: store.general.fetching,
  gameForm: store.general.gameForm,
}))

export default class GameForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = { name: '', price: '', platform: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showGamesForList = this.showGamesForList.bind(this);
  }

  static propTypes = {
    dispatch: PropTypes.func,
    empty: PropTypes.bool,
    current_list: PropTypes.object,
    fetching: PropTypes.bool,
    gameForm: PropTypes.bool,
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const obj = {
      delete: false,
      list: this.props.current_list,
      id: '',
      game: this.state,
    };
    this.props.dispatch(asyncLoadUpdatedGamesForList(obj));
    this.props.dispatch(showGames());
  }

  showGamesForList() {
    this.props.dispatch(showGames());
  }

  render() {
    const visual = <div>
            <Paper style={ styles.head } rounded={false} zDepth={1}>
                <Button style={ styles.button }
                        backgroundColor={ styles.button.backgroundColor }
                        type="back" value="Back"
                        label="Back" onTouchTap={this.showGamesForList} />
                <h3 style={ styles.h3 }><span style={ styles.span }>Add new</span> Game
                </h3>
            </Paper>
            <div style={ styles.form }>
                <form onSubmit={this.handleSubmit} style={ styles.innerForm }>
                    <span style={ styles.spanForm }>Name</span>
                    <TextField id="name" name="name" type="text"
                               style={ styles.field }
                               value={this.state.name}
                               underlineStyle={ styles.autoField }
                               inputStyle={ styles.innerField }
                               onChange={this.handleChange}
                               errorText="This field is required"
                               floatingLabelFixed={true}
                               floatingLabelText="Game"/><br/>
                    <span style={ styles.spanForm }>Price</span>
                    <TextField id="price" name="price" type="text"
                               style={ styles.field }
                               underlineStyle={ styles.autoField }
                               inputStyle={ styles.innerField }
                               value={this.state.price}
                               onChange={this.handleChange}
                               errorText="This field is required"
                               floatingLabelFixed={true}
                               floatingLabelText="Price"/><br/>
                    <span style={ styles.spanForm }>Platform</span>
                    <TextField id="platform" name="platform" type="text"
                               style={ styles.field }
                               underlineStyle={ styles.autoField }
                               inputStyle={ styles.innerField }
                               value={this.state.platform}
                               onChange={this.handleChange}
                               floatingLabelFixed={true}
                               floatingLabelText="Platform"/>
                    <Button type="submit" value="Submit"
                            style={ styles.buttonAdd } label='Add' />
                </form>
            </div>
        </div>;

    return visual;
  }
}
