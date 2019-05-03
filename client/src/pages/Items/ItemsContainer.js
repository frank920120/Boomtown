import React, { Component } from 'react';
import Items from './Items';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/Fullscreenloader';
import { Query } from 'react-apollo';
import { ALL_ITEMS_QUERY, VIEWER_QUERY } from '../../apollo/queries';

class ItemsContainer extends Component {
  render() {
    return (
      <Query query={VIEWER_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <FullScreenLoader />;
          if (error) return `Error! ${error.message}`;
          if (data) {
            return (
              <Query
                query={ALL_ITEMS_QUERY}
                variables={{ filter: data.viewer.id }}
              >
                {({ loading, error, data }) => {
                  if (loading) return <FullScreenLoader />;
                  if (error) return `Error! ${error.message}`;
                  if (data) {
                    return (
                      <Items items={data.items} classes={this.props.classes} />
                    );
                  }
                }}
              </Query>
            );
          }
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ItemsContainer);
