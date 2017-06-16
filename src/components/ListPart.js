import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RaisedButton as Button, Paper } from 'material-ui';
import CircularProgress from 'material-ui/CircularProgress';
import { loadLists, showAddListForm } from '../actions';
import ListCard from '../components/ListCard';
import ListForm from '../components/ListForm';

const styles = {
  head: {
    width: '100%',
    backgroundColor: '#27c79a',
    padding: '15px',
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
};

@connect(store => ({
  lists: store.general.lists,
  empty: store.general.lists.empty,
  user: store.user.user_data,
  displayLists: store.general.displayLists,
  addList: store.general.addList,
  editList: store.general.editList,
  fetching: store.general.fetching,
  theme: store.general.theme,
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
    theme: PropTypes.object.isRequired,
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
        <Paper style={ styles.head } rounded={false} zDepth={1}>
          <h3 style={ styles.h3 }><span style={ styles.span }>
              { this.props.user.name }</span>'s Lists: </h3>
                <Button style={ styles.button }
                        backgroundColor={ styles.button.backgroundColor }
                        type="add" value="Add"
                        label="Add List"
                        onTouchTap={this.showAddForm}/>
        </Paper>
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
