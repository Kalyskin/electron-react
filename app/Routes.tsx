/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from './constants/routes.json';
import HomePage from './containers/HomePage';
import CategoryPage from './containers/CategoryPage';
import QuizAdminPage from './containers/QuizAdminPage';
import QuizPage from './containers/QuizPage';
import ResultPage from './containers/ResultPage';

export default function Routes() {
  return (
    <Switch>
      <Route exact path={routes.HOME} component={HomePage} />
      <Route exact path={routes.CATEGORY} component={CategoryPage} />
      <Route exact path={routes.QUIZ_ADMIN} component={QuizAdminPage} />
      <Route exact path={routes.QUIZ} component={QuizPage} />
      <Route exact path={routes.RESULT} component={ResultPage} />
    </Switch>
  );
}
