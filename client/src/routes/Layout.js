import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import ItemsContainer from '../pages/Items';
import Home from '../pages/Home';
import ShareContainer from '../pages/Share';
import ProfileContainer from '../pages/Profile';
import Menu from '../components/Menu';
import { ViewerContext } from '../context/ViewerProvider';
// import FullScreenLoader from '../components/FullScreenLoader';
import PrivateRoute from '../components/PrivateRoute';

export default () => (
  <ViewerContext.Consumer>
    {({ loading, viewer }) => {
      if (loading) return 'Loading....';
      if (!viewer) {
        return (
          <Switch>
            <Route exact path="/welcome" name="home" component={Home} />
            <Redirect from="*" to="/welcome" />
          </Switch>
        );
      }
      return (
        <React.Fragment>
          <Menu />
          <Switch>
            <PrivateRoute
              exact
              path="/items"
              name="items"
              component={ItemsContainer}
            />
            <PrivateRoute
              exact
              path="/profile"
              name="profile"
              component={ProfileContainer}
            />
            {/* <Route
              exact
              path="/profile/:userId"
              name="profile"
              component={ProfileContainer}
            /> */}
            <PrivateRoute
              exact
              path="/share"
              name="share"
              component={ShareContainer}
            />
            <Redirect from="*" to="/items" />
          </Switch>
        </React.Fragment>
      );
    }}
  </ViewerContext.Consumer>
);
