import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import ListIcon from 'material-ui/svg-icons/social/pages';
import transitions from 'material-ui/styles/transitions';
import { RaisedButton as Button, Paper } from 'material-ui';
import { logoutUser } from '../auth/auth_actions';

const styles = {
  element: {
    position: 'fixed',
    top: 0,
    width: '100%',
    boxSizing: 'border-box',
    zIndex: 10,
    transition: transitions.easeOut(null, 'background-color', null),
    backgroundColor: '#333e50',
  },
  appBar: {
    boxShadow: 'none',
    backgroundColor: '#333e50',
  },
  headlines: {
    transition: transitions.easeOut(null, 'padding-left', null),
    paddingRight: 20,
  },
  headline: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 'normal',
    margin: 0,
  },
  h1: {
    fontSize: '1.7em',
    color: '#fff',
    textTransform: 'lowercase',
    marginTop: '45px',
    fontWeight: '300',
  },
  span: {
    color: '#27c79a',
    letterSpacing: '0.07em',
    fontWeight: '400',
  },
  button: {
    margin: '15px',
    marginRight: 0,
  },
  icon: {
    height: '50px',
    width: '50px',
    float: 'left',
    marginTop: '30px',
    paddingLeft: '16px',
  },
  text: {
    float: 'right',
    height: '80px',
    bottom: 0,
    textAlign: 'right',
  },
};

@connect(store => ({
  user: store.user.user_data,
}))

export default class MediaBar extends React.Component {
  static propTypes = {
    onLeftIconButtonTouchTap: PropTypes.func.isRequired,
    iconStyleLeft: PropTypes.object,
    style: PropTypes.object,
    height: PropTypes.number,
    theme: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
    user: PropTypes.object,
  };


  render() {
    return <div style={{
      height: this.props.height,
      ...styles.element,
      backgroundColor: this.props.theme.palette.primary1Color,
      color: this.props.theme.palette.alternateTextColor,
    }}>
          <AppBar style={styles.appBar}
                  onLeftIconButtonTouchTap={this.props.onLeftIconButtonTouchTap}
                  iconStyleLeft={this.props.iconStyleLeft}>
            <Button type="Submit" label='Logout'
                    style={{ ...styles.button }}
                    onTouchTap={() => this.props.dispatch(logoutUser(this.props.user))} />
          </AppBar>
          <Paper style={{ ...styles.headlines, ...this.props.style }} zDepth={2}>
            <ListIcon style={ styles.icon } />
            <div style={ styles.text }>
            <h1 style={{ ...styles.headline, ...styles.h1 }}>
              Hello <span style={ styles.span }>{ this.props.user.name }</span> !</h1>
            </div>
          </Paper>
        </div>;
  }
}
