import React from 'react';
import ShareForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';
import Grid from '@material-ui/core/Grid';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

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

export default withStyles(styles)(Share);
