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
  time: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackLine: {
    margin: 5,
    fontWeight: 'normal',
  },
};

const GameCard = ({ img, title, price, platform, link }) => (
    <Paper style={styles.element}>
        <div style={styles.time}>
        {price}
        </div>
        <div style={styles.track}>
            {img}
        <h2 style={styles.trackLine}>
        {title}
        </h2>
        <h3 style={styles.trackLine}>
        {platform}
        </h3>
        <a href={link}></a>
        </div>
    </Paper>
);

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  platform: PropTypes.string,
  link: PropTypes.string,
  img: PropTypes.instanceOf(Image),
};

export default GameCard;
