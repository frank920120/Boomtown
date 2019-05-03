import React from 'react';
import { Card, Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import styles from './style';
import { withStyles } from '@material-ui/core/styles';
import Gravatar from 'react-gravatar';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ItemsCard = ({ item, viewer, classes }) => {
  let formatDate = moment(item.created).fromNow();
  const tagsFormat = item.tags.map(t => t.title).join(',');

  return (
    <Link
      to={!viewer ? `/profile/${item.itemowner.id}` : `/profile/${viewer.id}`}
    >
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          component="img"
          alt="img"
          image={
            item.imageurl === ''
              ? 'https://dummyimage.com/400x200/999999/fff'
              : item.imageurl
          }
          title="Contemplative Reptile"
        />
        <CardContent className={classes.profileItem}>
          <Gravatar
            className={classes.profileImg}
            email={!viewer ? item.itemowner.email : viewer.email}
            size={50}
          />
          <CardContent>
            <Typography component="p">
              {!viewer ? item.itemowner.fullname : viewer.fullname}
            </Typography>
            <Typography variant="caption">{formatDate}</Typography>
          </CardContent>
        </CardContent>
        <CardContent className={classes.itemInfo}>
          <Typography variant="title" component="h3">
            {item.title}
          </Typography>
          <CardContent className={classes.tags}>
            <Typography variant="caption" component="span">
              {tagsFormat}
            </Typography>
          </CardContent>
          <Typography>{item.description}</Typography>
        </CardContent>
        <CardActions className={classes.button}>
          <Button variant="outlined" color="inherit" className={classes.button}>
            BORROW
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
};
ItemsCard.defaultProps = {
  viewer: null,
  item: {
    title: 'Name your item',
    description: 'Describe your item',
    imageurl: 'https://dummyimage.com/400x200/999999/fff',
    itemowner: {
      fullname: 'JUN FANG',
      email: 'frankfang2014@hotmail.com'
    },
    tags: []
  }
};
export default withStyles(styles)(ItemsCard);
