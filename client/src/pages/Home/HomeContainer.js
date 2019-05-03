import React, { Component } from 'react';
import Home from './Home';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Query } from 'react-apollo';
import { ALL_TAGS_QUERY } from '../../apollo/queries';

class HomeContainer extends Component {
  render() {
    return (
      <Query query={ALL_TAGS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          if (data) {
            console.log(data);
            return <Home classes={this.props.classes} />;
          }
        }}
      </Query>
    );
  }
}
export default withStyles(styles)(HomeContainer);
