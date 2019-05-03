import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Gravatar from 'react-gravatar';

const Profile = ({ classes, user }) => {
  console.log(user);
  return (
    <Grid container className={classes.root}>
      <Grid className={classes.profileDiv} item xs={12}>
        <Gravatar className={classes.profileImg} email={user.email} size={50} />
        <h1>{user.fullname}</h1>
        <p>
          {user.items.length} Items shared {user.borrowed.length} Items borrowed
        </p>
        {user.bio === '' ? 'No bio provided.' : user.bio}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Profile);
