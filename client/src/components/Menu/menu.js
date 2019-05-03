import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import styles from './style';
import CardMedia from '@material-ui/core/CardMedia';
import logo from '../../images/boomtown.svg';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import LongMenu from '../LongMenu/LongMenu';
function Menu(props) {
  const { classes } = props;
  const currentPath = window.location.pathname;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Link to="/items">
            <CardMedia
              className={classes.logo}
              component="img"
              alt="img"
              image={logo}
              title="boomtown logo"
            />
          </Link>
          <div className={classes.navRight}>
            {currentPath !== '/share' ? (
              <Link to="/share">
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  className={classes.margin}
                >
                  <AddIcon />
                  SHARE SOMETHING
                </Button>
              </Link>
            ) : (
              ''
            )}
            <LongMenu />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menu);
