/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import {
    HashRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import transitions from 'material-ui/styles/transitions';
import ListIcon from 'material-ui/svg-icons/action/list';
import MediaBar from './components/MediaBar';
import Lists from './routes/Lists';

const headerHeight = 160;
const styles = {
  content: {
    padding: 16,
    maxWidth: 800,
    transition: transitions.easeOut(null, 'padding-left', null),
    marginTop: headerHeight,
  },
  menuLink: {
    textDecoration: 'none',
  },
};

const routes = [
  {
    link: '/',
    exact: true,
    title: 'Lists',
    component: Lists,
    icon: <ListIcon/>,
  },
];

@connect(store => ({
  lists: store.lists,
  theme: store.theme,
}))

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: {
        open: false,
        docked: false,
      },
    };
  }

  static propTypes = {
    lists: PropTypes.object,
    theme: PropTypes.object,
  };

  toggleDrawer() {
    this.setState({
      drawer: {
        ...this.state.drawer,
        open: !this.state.drawer.open,
      },
    });
  }

  closeDrawer() {
    if (!this.state.drawer.docked) {
      this.setState({
        drawer: {
          ...this.state.drawer,
          open: false,
        },
      });
    }
  }

  render() {
    const paddingLeft = (this.state.drawer.docked ? 256 : 0) + 16;
    return <MuiThemeProvider muiTheme={this.props.theme}>
        <Router>
          <div>
            <MediaBar onLeftIconButtonTouchTap={() => this.toggleDrawer()}
                      height={headerHeight}
                      theme={this.props.theme}
                      iconStyleLeft={{ display: this.state.drawer.docked ? 'none' : 'block' }}
                      style={{ paddingLeft }}/>
            <Drawer open={this.state.drawer.open}
                    docked={this.state.drawer.docked}
                    onRequestChange={() => this.toggleDrawer()}>
                {routes.map(route => (
                    <Link to={route.link} key={route.link} style={styles.menuLink}>
                      <MenuItem primaryText={route.title}
                                leftIcon={route.icon}
                                onTouchTap={() => this.closeDrawer()}/>
                    </Link>
                ))}
            </Drawer>
            <div style={{ ...styles.content, paddingLeft }}>
                {routes.map(route => (
                    <Route exact
                           key={route.link}
                           path={route.link}
                           component={route.component}/>
                ))}
            </div>
          </div>
        </Router>
      </MuiThemeProvider>;
  }
}

