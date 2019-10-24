import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { CircularProgress, Fade, makeStyles } from '@material-ui/core';

import { CredentialsDTO, UserDetailsDTO } from '@models/api';
import { useUndux } from '@hooks/useUndux';
import { Login, LOGIN, Register, REGISTER } from '@graphql/mutations';
import { UserForm } from '@components/user/form/form.component';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
  },
}));

const LoginPage: React.FunctionComponent = () => {
  const classes = useStyles({});
  const history = useHistory();
  const [login, loginResponse] = useMutation<Login, CredentialsDTO>(LOGIN);
  const [register, registerResponse] = useMutation<Register, UserDetailsDTO>(REGISTER);

  const [token, setToken] = useUndux('token');
  const [, setError] = useUndux('error');
  const [state, setState] = React.useState({
    action: login || register,
    button: 'LOGIN',
    email: false,
    linkLabel: 'CREATE AN ACCOUNT',
  });

  React.useEffect(() => {
    if (registerResponse.data) setToken(registerResponse.data.register.token);
    if (registerResponse.data) loginResponse.data = undefined;

    if (registerResponse.error) setError(registerResponse.error.message);
    if (registerResponse.error) registerResponse.error = undefined;
  });

  React.useEffect(() => {
    if (loginResponse.data) setToken(loginResponse.data.login.token);
    if (loginResponse.data) loginResponse.data = undefined;

    if (loginResponse.error) setError(loginResponse.error.message);
    if (loginResponse.error) loginResponse.error = undefined;
  });

  React.useEffect(() => {
    if (token) setTimeout(() => history.push('/'), 800);
  });

  const handleLink = () => {
    const isLogin = state.action === login;
    setState({
      action: isLogin ? register : login,
      button: isLogin ? 'CREATE ACCOUNT' : 'LOGIN',
      email: isLogin,
      linkLabel: isLogin ? 'ALREADY HAVE AN ACCOUNT?' : 'CREATE AN ACCOUNT',
    });
  };

  const handleSubmit = (user: UserDetailsDTO) => {
    const { username, password, email } = user;
    state.action({ variables: { username, password, email } });
  };

  const { button, email, linkLabel } = state;
  const loading = loginResponse.loading || registerResponse.loading;
  return (
    <Fade in={!token}>
      <div className={classes.root}>
        <Fade in={loading}>
          <CircularProgress className={classes.loading} />
        </Fade>

        <Fade in={!loading && !token}>
          <div>
            <UserForm
              button={button}
              email={email}
              link
              linkLabel={linkLabel}
              onLink={handleLink}
              onSubmit={handleSubmit}
            />
          </div>
        </Fade>
      </div>
    </Fade>
  );
};

export { LoginPage };
