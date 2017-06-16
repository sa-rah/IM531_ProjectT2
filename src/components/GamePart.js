/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RaisedButton as Button, TextField, CircularProgress, Paper } from 'material-ui';
import { showLists, asyncLoadUpdatedGamesForList } from '../actions';
import GameCard from '../components/GameCard';

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
    marginTop: '30px',
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
};

@connect(store => ({
  current_list: store.general.current_list,
  empty: store.general.lists.empty,
  fetching: store.general.fetching,
}))

export default class Lists extends React.Component {

  constructor(props) {
    super(props);

    this.state = { name: '', price: '', platform: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showUserLists = this.showUserLists.bind(this);
  }

  static propTypes = {
    dispatch: PropTypes.func,
    empty: PropTypes.bool,
    current_list: PropTypes.object,
    _id: PropTypes.string,
    fetching: PropTypes.bool,
  };

  showUserLists() {
    this.props.dispatch(showLists());
  }

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
  }

  render() {
    const games = this.props.current_list.games;
    const name = this.props.current_list.name;
    const visual = <div>
      <Paper style={ styles.head } rounded={false} zDepth={1}>
        <Button style={ styles.button }
                backgroundColor={ styles.button.backgroundColor }
                type="back" value="Back"
                label="Back" onTouchTap={this.showUserLists} />
        <h3 style={ styles.h3 }><span style={ styles.span }>{ name }</span> - Games
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
      <div>
        {this.props.fetching ?
            <div><CircularProgress style={ styles.loading }/></div> :
            <ul>
                {games.map((item, index) =>
                    <GameCard {...item} key={index}/>)
                }
            </ul>
        }
      </div>
    </div>;

    return visual;
  }

}
