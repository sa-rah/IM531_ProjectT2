import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import ListIcon from 'material-ui/svg-icons/social/pages';
import transitions from 'material-ui/styles/transitions';

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
  },
};

export default class MediaBar extends React.Component {
  static propTypes = {
    onLeftIconButtonTouchTap: PropTypes.func.isRequired,
    iconStyleLeft: PropTypes.object,
    style: PropTypes.object,
    height: PropTypes.number,
    theme: PropTypes.object.isRequired,
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
                  iconStyleLeft={this.props.iconStyleLeft} />
          <div style={{ ...styles.headlines, ...this.props.style }}>
            <ListIcon/>
            <h1 style={{ ...styles.headline, ...styles.h1 }}>Test</h1>
          </div>
        </div>;
  }
}
