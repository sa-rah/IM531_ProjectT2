import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RaisedButton as Button } from 'material-ui';
import CircularProgress from 'material-ui/CircularProgress';
import { loadLists, showAddListForm } from '../actions';
import ListCard from '../components/ListCard';
import ListForm from '../components/ListForm';


@connect(store => ({
  lists: store.general.lists,
  empty: store.general.lists.empty,
  user: store.user.user_data,
  displayLists: store.general.displayLists,
  addList: store.general.addList,
  editList: store.general.editList,
  fetching: store.general.fetching,
}))

export default class Lists extends React.Component {
  constructor(props) {
    super(props);

    this.showAddForm = this.showAddForm.bind(this);
  }

  static propTypes = {
    lists: PropTypes.array,
    dispatch: PropTypes.func,
    empty: PropTypes.bool,
    user: PropTypes.object,
    displayLists: PropTypes.bool,
    addList: PropTypes.bool,
    editList: PropTypes.bool,
    fetching: PropTypes.bool,
  };

  componentWillMount() {
    if (!this.props.fetching) {
      this.props.dispatch(loadLists(this.props.user));
    }
  }

  showAddForm() {
    this.props.dispatch(showAddListForm(this.props));
  }

  render() {
    const lists = this.props.lists;
    const addList = this.props.addList;
    const editList = this.props.editList;
    let visual;
    if (addList || editList) {
      visual = <ListForm />;
    } else {
      visual = <div>
                <h3>Your Lists: </h3>
                <Button type="add" value="Add" label="Add List" onTouchTap={this.showAddForm}/>
                {this.props.fetching ?
                <div><CircularProgress /></div> :
                    <ul>
                        {lists.map((item, index) =>
                            <ListCard {...item} key={index}/>)
                        }
                    </ul>
                }
            </div>;
    }

    return visual;
  }
}
