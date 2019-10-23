import React from 'react';

import { FormGroup, Button, PropTypes, makeStyles } from '@material-ui/core';

import { UserDetailsDTO } from '@models/api/user.dto';
import { Input } from '@components/general/input/input.component';

const useStyles = makeStyles(theme => ({
  root: {
    width: '35vw',
    minWidth: 300,
    maxWidth: 500,
    padding: 10,
  },
  button: {
    marginTop: 40,
    marginBottom: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  link: {
    color: 'white',
    margin: 10,
    marginRight: 'auto',
    marginLeft: 'auto',
    textDecoration: 'none',
  },
}));

interface UserFormProps {
  button: string;
  buttonColor?: PropTypes.Color;
  email?: boolean;
  link?: boolean;
  linkLabel?: string;
  onLink: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onSubmit: (user: UserDetailsDTO) => void;
}

const UserForm: React.FunctionComponent<UserFormProps> = ({
  button,
  buttonColor,
  email,
  link,
  linkLabel,
  onLink,
  onSubmit,
}) => {
  const classes = useStyles({});
  const [user, setUser] = React.useState({ username: '', email: '', password: '' });

  const handleChange = (key: string) => {
    return (value: string) => {
      setUser({
        ...user,
        [key]: value,
      });
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup className={classes.root}>
        <Input
          elevation={8}
          leadingIcon="account_circle"
          placeholder="Username"
          type="username"
          value={user.username}
          onChange={handleChange('username')}
          ariaLabel="username"
        />
        <Input
          elevation={8}
          leadingIcon="email"
          placeholder="Email"
          style={{ display: email ? '' : 'none' }}
          type="email"
          value={email ? user.email : ''}
          onChange={handleChange('email')}
          ariaLabel="email"
        />
        <Input
          elevation={8}
          leadingIcon="lock"
          placeholder="Password"
          type="password"
          value={user.password}
          onChange={handleChange('password')}
          ariaLabel="password"
        />
        <Button
          className={classes.button}
          color={buttonColor || 'primary'}
          variant="contained"
          type="submit"
        >
          {button}
        </Button>
        {link && linkLabel && (
          <Button className={classes.link} variant="text" onClick={onLink}>
            {linkLabel}
          </Button>
        )}
      </FormGroup>
    </form>
  );
};

export { UserForm };
