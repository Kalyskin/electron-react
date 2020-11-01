/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import QuizAdminPage from './containers/QuizAdminPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route exact path={routes.HOME} component={HomePage} />
        <Route exact path={routes.QUIZ_ADMIN} component={QuizAdminPage} />
      </Switch>
    </App>
  );
}
