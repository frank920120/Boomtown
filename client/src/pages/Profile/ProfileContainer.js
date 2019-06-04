import React, { Component } from 'react';
import Profile from './Profile';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/Fullscreenloader';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';

class ProfileContainer extends Component {
  render() {
    const { userId } = this.props.match.params;
    return (
      <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: userId }}>
        {({ loading, error, data }) => {
          if (loading) return <FullScreenLoader />;
          if (error) return `Error! ${error.message}`;
          if (data) {
            return <Profile user={data.user} />;
          }
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ProfileContainer);
