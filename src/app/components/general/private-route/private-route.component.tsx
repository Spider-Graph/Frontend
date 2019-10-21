import React from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';

type PrivateRoute = {
  component: () => JSX.Element,
};

const PrivateRoute: React.FunctionComponent<any> = ({ component: Component, ...rest }) => {
  const history = useHistory();
  const token = '';
  const redirect = '/login';

  React.useEffect(() => {
    if (!token) history.push(redirect);
  }, [history, token]);

  return (
    <Route
      {...rest}
      render={props => (token ? <Component {...props} /> : <Redirect to={redirect} />)}
    />
  );
};

export { PrivateRoute };
