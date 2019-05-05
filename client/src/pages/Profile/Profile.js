import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Gravatar from 'react-gravatar';
import { Typography } from '@material-ui/core';
import ItemsGrid from '../../components/ItemsGrid';
const Profile = ({ classes, user }) => {
  return (
    <div>
      <Grid container className={classes.root}>
        <Grid className={classes.profileDiv} item xs={12}>
          <div className={classes.container}>
            <div className={classes.header}>
              <Gravatar
                className={classes.profileImg}
                email={user.email}
                size={50}
              />
              <Typography
                className={classes.fullname}
                component="h2"
                variant="display3"
                gutterBottom
              >
                {user.fullname}
              </Typography>
            </div>
            <Typography variant="headline" component="h3" gutterBottom>
              {user.items.length} Items shared {user.borrowed.length} Items
              borrowed
            </Typography>
            <Typography component="h2" variant="headline" gutterBottom>
              {user.bio === null ? '"No bio provided."' : user.bio}
            </Typography>
          </div>
        </Grid>
        <div className={classes.shareitemContainer}>
          <Typography className={classes.shareitem} gutterBottom>
            Shared Items :
          </Typography>
          <ItemsGrid items={user.items} />
        </div>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Profile);
