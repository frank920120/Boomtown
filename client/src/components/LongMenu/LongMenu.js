//credit : Material-UI https://material-ui.com/demos/menus/

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Mutation } from 'react-apollo';
import { LOGOUT_MUTATION, VIEWER_QUERY } from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { ViewerContext } from '../../context/ViewerProvider';
import FullScreenLoader from '../Fullscreenloader';
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
    const { classes, logoutMutataion } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <ViewerContext.Consumer>
        {({ loading, viewer }) => {
          if (loading) return <FullScreenLoader />;
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
                <a href={`/profile/${viewer.id}`} className={classes.link}>
                  <MenuItem key={'Profile'} onClick={this.handleClose}>
                    <i className="fas fa-address-card" /> Your Profile
                  </MenuItem>
                </a>
                <Mutation mutation={LOGOUT_MUTATION}>
                  {(logout, { data }) => (
                    <MenuItem
                      key={'LogOut'}
                      onClick={() => {
                        logoutMutataion();
                      }}
                    >
                      <i className="fas fa-sign-out-alt" /> Sign Out
                    </MenuItem>
                  )}
                </Mutation>
              </Menu>
            </div>
          );
        }}
      </ViewerContext.Consumer>
    );
  }
}
const refetchQueries = [
  {
    query: VIEWER_QUERY
  }
];
LongMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutMutataion: PropTypes.func.isRequired
};
export default compose(
  graphql(LOGOUT_MUTATION, {
    options: {
      refetchQueries
    },
    name: 'logoutMutataion'
  }),

  withStyles(styles)
)(LongMenu);
