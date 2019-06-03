import React from 'react';
import Loader from 'react-loader-spinner';
import styles from './style';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
const FullScreenLoader = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Loader type="Plane" color="#f9a825" height="100" width="100" />
    </div>
  );
};
FullScreenLoader.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(FullScreenLoader);
