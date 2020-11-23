/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from './constants/routes.json';
import HomePage from './containers/HomePage';
import CategoryPage from './containers/CategoryPage';
import QuizPage from './containers/QuizPage';
import ResultPage from './containers/ResultPage';
import Dashboard from './containers/Dashboard';
import { PrivateRoute } from './components/PrivateRoute';
import AuthPage from './containers/Dashboard/Auth';

export default function Routes() {
  return (
    <Switch>
      <Route exact path={routes.HOME} component={HomePage} />
      <Route exact path={routes.CATEGORY} component={CategoryPage} />
      <Route exact path={routes.QUIZ} component={QuizPage} />
      <Route exact path={routes.RESULT} component={ResultPage} />
      <Route exact path={routes.ADMIN_AUTH} component={AuthPage} />
      <PrivateRoute path={routes.ADMIN} component={Dashboard} />
    </Switch>
  );
}
