import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ItemCard from '../ItemsCard';
import styles from './style';
import PropTypes from 'prop-types';
const ItemsGrid = ({ items, classes }) => {
  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="center"
      spacing={24}
    >
      <Grid item xs={12}>
        <Grid container justify="center">
          {items.map(item => <ItemCard key={item.id} item={item} />)}
        </Grid>
      </Grid>
    </Grid>
  );
};
ItemsGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.array
};
export default withStyles(styles)(ItemsGrid);
