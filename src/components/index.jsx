import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// ROUTES
import {
  MAIN_LINK,
  AUTH_LINK,
  EDIT_LINK,
  REVIEW_LINK,
  SUCCESS_LINK
} from '../constants/routeConstants';

// COMPONENTS
import Main from './Main';
import Authenticate from './Authenticate';
import Edit from './edit/Edit';
import Review from './Review';
import Success from './Success';

const history = createBrowserHistory();
history.listen((location) => {
  // Use setTimeout to make sure this runs after React Router's own listener
  setTimeout(() => {
    // Keep default behavior of restoring scroll position when user:
    // - clicked back button
    // - clicked on a link that programmatically calls `history.goBack()`
    // - manually changed the URL in the address bar (here we might want
    // to scroll to top, but we can't differentiate it from the others)
    if (location.action === 'POP') {
      return;
    }
    // In all other cases, scroll to top
    window.scrollTo(0, 0);
  });
});

// main routes are here, sub-routes are in their respective container components
export default (
  <Router history={history}>
    {/* <div> */}
    <Switch>
      <Route exact path={MAIN_LINK} component={Authenticate} />
      {/* <Route path={AUTH_LINK} component={Authenticate} /> */}
      <Route path={EDIT_LINK} component={Edit} />
      <Route path={REVIEW_LINK} component={Review} />
      <Route path={SUCCESS_LINK} component={Success} />
    </Switch>
    {/* </div> */}
  </Router>
);
