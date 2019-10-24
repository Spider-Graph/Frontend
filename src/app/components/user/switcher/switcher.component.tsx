import React from 'react';
import { QueryResult } from '@apollo/react-common';

import { Button, CircularProgress, Typography, makeStyles } from '@material-ui/core';

import { useUndux } from '@hooks/useUndux';
import { Me } from '@graphql/queries';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(2),
    marginTop: 0,
    [theme.breakpoints.up('md')]: {
      flexDirection: 'column',
      alignItems: 'start',
    },
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    margin: theme.spacing(2),
  },
  user: {
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
  signout: {
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}));

interface UserSwitcherProps {
  me: QueryResult<Me, null>;
}

const UserSwitcher: React.FunctionComponent<UserSwitcherProps> = ({ me }) => {
  const classes = useStyles({});
  const { loading, data } = me;
  const [, setToken] = useUndux('token');

  const handleSignOut = () => {
    setToken(null);
  };

  if (loading)
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );

  return (
    <section className={classes.root}>
      <div className={classes.user}>
        <Typography component="h4" variant="h5">
          {data && data.me.username}
        </Typography>
        <Typography component="span" variant="subtitle2" gutterBottom>
          {data && data.me.email}
        </Typography>
      </div>

      <Button className={classes.signout} onClick={handleSignOut}>
        Sign Out
      </Button>
    </section>
  );
};

export { UserSwitcher };
