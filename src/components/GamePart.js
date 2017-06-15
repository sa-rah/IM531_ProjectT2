/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RaisedButton as Button, TextField, CircularProgress } from 'material-ui';
import { showLists, asyncLoadUpdatedGamesForList } from '../actions';
import GameCard from '../components/GameCard';


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
        <Button type="back" value="Back" label="Back" onTouchTap={this.showUserLists} />
        <h3>{ name } - Games</h3>
        <form onSubmit={this.handleSubmit}>
          <TextField id="name" name="name" type="text" value={this.state.name} onChange={this.handleChange} hintText="Game"
                     errorText="This field is required"
                     floatingLabelText="Game"/> <br/>
          <TextField id="price" name="price" type="text" value={this.state.price} onChange={this.handleChange} hintText="Price"
                     errorText="This field is required"
                     floatingLabelText="Price"/>
          <TextField id="platform" name="platform" type="text" value={this.state.platform} onChange={this.handleChange} hintText="Platform"
                     errorText="This field is required"
                     floatingLabelText="Platform"/>
          <Button type="submit" value="Submit" label='Add' />
        </form>
        {this.props.fetching ?
            <div><CircularProgress /></div> :
            <ul>
                {games.map((item, index) =>
                    <GameCard {...item} key={index}/>)
                }
            </ul>
        }
    </div>;

    return visual;
  }

}
