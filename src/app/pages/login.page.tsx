import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { makeStyles } from '@material-ui/core';

import { UserDetailsDTO } from '@models/api/user.dto';
import { StoreService } from '@services/store.service';
import { LOGIN, REGISTER } from '@graphql/mutations';
import { UserForm } from '@components/user/form/form.component';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.primary['main'],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const LoginPage: React.FunctionComponent = () => {
  const classes = useStyles({});
  const history = useHistory();
  const store = StoreService.useStore();
  const [login, loginResponse] = useMutation(LOGIN);
  const [register, registerResponse] = useMutation(REGISTER);

  const [state, setState] = React.useState({
    action: login,
    button: 'LOGIN',
    email: false,
    linkLabel: 'CREATE AN ACCOUNT',
  });

  React.useEffect(() => {
    const data = loginResponse.data || registerResponse.data;
    if (!data) return;

    const token = data.login ? data.login.token : data.register.token;
    store.set('token')(token);
    if (token) history.push('/');
  }, [loginResponse, registerResponse, store, history]);

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
  return (
    <div className={classes.root}>
      <UserForm
        button={button}
        email={email}
        link
        linkLabel={linkLabel}
        onLink={handleLink}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export { LoginPage };
