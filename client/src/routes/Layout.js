import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import ItemsContainer from '../pages/Items';
import Home from '../pages/Home';
import ShareContainer from '../pages/Share';
import ProfileContainer from '../pages/Profile';
import Menu from '../components/Menu';

export default ({ match }) => (
  <Fragment>
    <Menu />

    <Switch>
      <Route path="/items" component={ItemsContainer} />
      <Route path="/welcome" component={Home} />
      <Route path="/share" component={ShareContainer} />
      <Route path="/profile" component={ProfileContainer} />
      <Redirect from="/" exact to="/welcome" />
      <Redirect to="/welcome" />
    </Switch>
  </Fragment>
);
