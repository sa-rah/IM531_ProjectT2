import React from 'react';
import { Paper } from 'material-ui';
import UseIcon from 'material-ui/svg-icons/action/question-answer';
import WhatIcon from 'material-ui/svg-icons/action/info';

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
  loading: {
    fill: '#27c79a',
    color: '#27c79a',
    textAlign: 'center',
    margin: 'auto',
    width: '100%',
  },
  list: {
    paddingLeft: 0,
    marginTop: 25,
  },
  container: {
    margin: 40,
    marginTop: 50,
    padding: 25,
    lineHeight: '1.4em',
    textAlign: 'center',
  },
  h4: {
    textTransform: 'lowercase',
    letterSpacing: '0.1em',
    color: '#df8671',
    marginTop: 0,
  },
  spanAbout: {
    color: '#27c79a',
    fontWeight: 600,
  },
  icon: {
    width: 40,
    height: 40,
  },
  p: {
    fontWeight: 300,
    fontSize: '1em',
  },
};

export default class Home extends React.Component {

  render() {
    return <div>
        <Paper style={ styles.head } rounded={false} zDepth={1}>
          <h3 style={ styles.h3 }>Welcome to <span style={ styles.span }>
                gamefam</span> !
          </h3>
        </Paper>
      <div>
        <Paper style={ styles.container }>
          <WhatIcon style={ styles.icon }/>
          <h4 style={ styles.h4 }>What is it?</h4>
          <p style={ styles.p }><span style={ styles.spanAbout }>gamefam </span>
            is an app that can be used to connect with other gamers, share lists of games with them
            that you want to buy/play together and therefore saving money.</p>
        </Paper>
        <Paper style={ styles.container }>
          <UseIcon style={ styles.icon }/>
          <h4 style={ styles.h4 }>How to use.</h4>
          <p style={ styles.p }>In the section 'lists' you can<br/>
            <span style={ styles.spanAbout }>add lists</span><br/>
            <span style={ styles.spanAbout }>edit existing lists</span><br/>
            and <span style={ styles.spanAbout }>add users to your lists.</span>
          </p>
          <p style={ styles.p }>If you click on one list <br/>
            the games added to the list are displayed.<br/>
            There you can <br/>
            <span style={ styles.spanAbout }>add games</span><br/>
            and <span style={ styles.spanAbout }>remove games </span><br/>
            by clicking on them.
          </p>
          <p style={ styles.p }>If you share a list with other users<br/>
            their list gets automatically updated.
          </p>
        </Paper>
      </div>
    </div>;
  }
}
