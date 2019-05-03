//credit : Material-UI https://material-ui.com/demos/menus/

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Link } from 'react-router-dom';

const ITEM_HEIGHT = 20;

class LongMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          className={classes.root}
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 5.5,
              width: 200
            }
          }}
        >
          <Link to="/profile" className={classes.link}>
            <MenuItem
              key={'Profile'}
              // selected={'Profile' === 'Profile'}
              onClick={this.handleClose}
            >
              <i class="fas fa-address-card" /> Your Profile
            </MenuItem>
          </Link>
          <MenuItem
            key={'LogOut'}
            // selected={'LogOut' === 'LogOut'}
            onClick={this.handleClose}
          >
            <i class="fas fa-sign-out-alt" /> Sign Out
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(LongMenu);
