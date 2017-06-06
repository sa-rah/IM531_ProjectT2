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
};

const ListCard = ({ name, users }) => (
    <Paper style={styles.element}>
        <div style={styles.track}>
            {name}
            {users}
        </div>
    </Paper>
);

ListCard.propTypes = {
  name: PropTypes.string,
  users: PropTypes.array,
};

export default ListCard;
