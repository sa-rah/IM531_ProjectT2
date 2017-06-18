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
import ProfileIcon from 'material-ui/svg-icons/social/person';
import GameFamIcon from 'material-ui/svg-icons/social/pages';
import HomeIcon from 'material-ui/svg-icons/action/home';
import MediaBar from './components/MediaBar';
import Lists from './routes/Lists';
import Profile from './routes/Profile';
import About from './routes/About';
import Home from './routes/Home';

const headerHeight = 160;
const styles = {
  content: {
    maxWidth: 800,
    transition: transitions.easeOut(null, 'padding-left', null),
    marginTop: headerHeight,
  },
  menuLink: {
    textDecoration: 'none',
  },
  menuItem: {
    fill: '#27c79a',
  },
};

const routes = [
  {
    link: '/',
    exact: true,
    title: 'Home',
    component: Home,
    icon: <HomeIcon style={ styles.menuItem } />,
  },
  {
    link: '/about',
    exact: true,
    title: 'About',
    component: About,
    icon: <GameFamIcon style={ styles.menuItem } />,
  },
  {
    link: '/lists',
    exact: true,
    title: 'Lists',
    component: Lists,
    icon: <ListIcon style={ styles.menuItem } />,
  },
  {
    link: '/profile',
    exact: true,
    title: 'Profile',
    component: Profile,
    icon: <ProfileIcon style={ styles.menuItem } />,
  },
];

@connect(store => ({
  lists: store.general.lists,
  theme: store.general.theme,
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
    user: PropTypes.object,
    lists: PropTypes.array,
    theme: PropTypes.object,
    dispatch: PropTypes.func,
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
    const paddingLeft = (this.state.drawer.docked ? 256 : 0);
    document.querySelector('html').style.backgroundColor = '#f5f7f9';
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

