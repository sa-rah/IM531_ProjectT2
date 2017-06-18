import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Avatar } from 'material-ui';
import { connect } from 'react-redux';
import ProfileIcon from 'material-ui/svg-icons/social/person';

const styles = {
  head: {
    width: '100%',
    backgroundColor: '#27c79a',
    padding: '16px',
    height: '70px',
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
  h4: {
    textTransform: 'lowercase',
    letterSpacing: '0.1em',
    color: '#df8671',
  },
  spanAbout: {
    color: '#27c79a',
    fontWeight: 600,
  },
  avatar: {
    width: '80%',
    margin: 'auto',
    marginTop: 50,
  },
  container: {
    margin: 40,
    marginTop: 50,
    padding: 25,
    lineHeight: '1.4em',
    textAlign: 'center',
  },
  avatarIcon: {
    width: 150,
    height: 150,
    marginLeft: 135,
  },
  icon: {
    width: 70,
    height: 70,
  },
};

@connect(store => ({
  user: store.user.user_data,
}))

export default class Profile extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  };


  render() {
    return <div>
      <Paper style={ styles.head } rounded={false} zDepth={1}>
          <h3 style={ styles.h3 }><span style={ styles.span }>
              { this.props.user.name }</span>'s Profile
          </h3>
        </Paper>
      <div style={ styles.avatar }>
        <Avatar style={ styles.avatarIcon } icon={<ProfileIcon style={ styles.icon } />} />
      </div>
      <Paper style={styles.container}>
        <p>
          <span style={ styles.spanAbout }>ID:</span><br/> { this.props.user.id }
        </p>
        <p>
          <span style={ styles.spanAbout }>Name:</span><br/> { this.props.user.name }
        </p>
        <p>
          <span style={ styles.spanAbout }>Mail:</span><br/> { this.props.user.mail }
        </p>
      </Paper>
    </div>;
  }
}
