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
import PropTypes from 'prop-types';
const ItemsCard = ({ item, classes }) => {
  let formatDate = moment(item.created).format('YYYY-MM-DD');

  const DateAgo = moment(formatDate, 'YYYY-MM-DD').fromNow();
  const tagsFormat = item.tags.map(t => t.title).join(',');

  return (
    <Card className={classes.card}>
      <CardMedia
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
          email={item.itemowner.email}
          size={50}
        />
        <CardContent>
          <Typography component="p">{item.itemowner.fullname}</Typography>
          <Typography variant="caption">{DateAgo}</Typography>
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
  );
};
ItemsCard.defaultProps = {
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
