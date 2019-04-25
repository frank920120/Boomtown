import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ItemCard from '../ItemsCard';
import styles from './style';
const ItemsGrid = ({ items, classes }) => {
  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="space-evenly"
      spacing={40}
    >
      {items.map(item => <ItemCard key={item.id} item={item} />)}
    </Grid>
  );
};

export default withStyles(styles)(ItemsGrid);
