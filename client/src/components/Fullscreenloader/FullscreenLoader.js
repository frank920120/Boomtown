import React from 'react';
import Loader from 'react-loader-spinner';
import styles from './style';
import { withStyles } from '@material-ui/core/styles';
const FullScreenLoader = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Loader type="Plane" color="#f9a825" height="100" width="100" />
    </div>
  );
};
export default withStyles(styles)(FullScreenLoader);
