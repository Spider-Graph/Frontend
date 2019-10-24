import React from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';

import { useUndux } from '@hooks/useUndux';

type PrivateRoute = {
  component: () => JSX.Element;
};

const PrivateRoute: React.FunctionComponent<any> = ({ component: Component, ...rest }) => {
  const history = useHistory();
  const [token] = useUndux('token');
  const redirect = '/login';

  React.useEffect(() => {
    if (!token) history.push(redirect);
  });

  return <Route {...rest} render={(props) => (token ? <Component {...props} /> : <Redirect to={redirect} />)} />;
};

export { PrivateRoute };
