import React from 'react';
import { Grid, Card, Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import styles from './style';
import { withStyles } from '@material-ui/core/styles';
import Gravatar from 'react-gravatar';
const ItemsCard = ({ item, classes }) => {
  console.log(item.tags);
  const date = item.created
    .split(' ')
    .slice(1, 4)
    .join('/');

  return (
    <Grid className={classes.root} item xs={4}>
      <Card className={classes.card}>
        <CardMedia
          component="img"
          alt="img"
          image={item.imageurl}
          title="Contemplative Reptile"
        />
        <CardContent className={classes.profileItem}>
          <Gravatar
            className={classes.profileImg}
            email={item.itemowner.email}
            size={50}
          />
          <CardContent>
            <Typography component="p">{item.itemowner.fullname}</Typography>
            <Typography variant="caption">{date}</Typography>
          </CardContent>
        </CardContent>
        <CardContent className={classes.itemInfo}>
          <Typography variant="h3" component="h2">
            {item.title}
          </Typography>
          <CardContent className={classes.tags}>
            {item.tags.map(tag => (
              <Typography variant="caption" component="span">
                {tag.title},
              </Typography>
            ))}
          </CardContent>
          <Typography>{item.description}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" color="inherit" className={classes.button}>
            BORROW
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default withStyles(styles)(ItemsCard);
