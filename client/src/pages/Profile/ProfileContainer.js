import React, { Component } from 'react';
import Profile from './Profile';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/Fullscreenloader';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY, VIEWER_QUERY } from '../../apollo/queries';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: this.props.match.params.userId
    };
  }
  render() {
    return !this.state.currentUserId ? (
      <Query query={VIEWER_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <FullScreenLoader />;
          if (error) return `Error! ${error.message}`;
          if (data) {
            return (
              <Query
                query={ALL_USER_ITEMS_QUERY}
                variables={{ id: data.viewer.id }}
              >
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
        }}
      </Query>
    ) : (
      <Query
        query={ALL_USER_ITEMS_QUERY}
        variables={{ id: this.state.currentUserId }}
      >
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
