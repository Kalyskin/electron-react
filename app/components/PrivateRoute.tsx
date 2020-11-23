import { Redirect, Route, RouteProps } from 'react-router-dom';
import React from 'react';
import { useRecoilValue } from 'recoil';
import routes from '../constants/routes.json';
import { authState } from '../recoil/atoms/authState';

export const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const auth = useRecoilValue(authState);
  return (
    <Route
      {...rest}
      render={(props: any) => {
        if (auth) {
          return <Component {...props} />;
        }
        return <Redirect to={routes.ADMIN_AUTH} />;
      }}
    />
  );
};
