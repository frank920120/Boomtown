import React from 'react';
import ShareForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';
import Grid from '@material-ui/core/Grid';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
const Share = ({ tags, classes }) => {
  return (
    <div>
      <Grid className={classes.root} container direction="row" justify="center">
        <Grid className={classes.gridItem} item xs={4}>
          <ShareItemPreview tags={tags} />
        </Grid>
        <Grid className={classes.gridItem} item xs={4}>
          <ShareForm tags={tags} />
        </Grid>
      </Grid>
    </div>
  );
};
Share.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired
};
export default withStyles(styles)(Share);
