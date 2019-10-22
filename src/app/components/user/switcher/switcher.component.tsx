import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Me, ME } from '@graphql/queries';
import { Button, CircularProgress, Typography, makeStyles } from '@material-ui/core';

import { StoreService } from '@services/store.service';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    marginTop: 0,
    [theme.breakpoints.up('md')]: {
      flexDirection: 'column',
      alignItems: 'start',
    },
  },
  user: {
    marginBottom: 10,
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

const UserSwitcher: React.FunctionComponent = () => {
  const classes = useStyles({});
  const store = StoreService.useStore();
  const { loading, data } = useQuery<Me, null>(ME);

  const handleSignOut = () => {
    store.set('token')(null);
  };

  return (
    <section className={classes.root}>
      {(loading && <CircularProgress />) || (
        <div className={classes.user}>
          <Typography component="h4" variant="h5">
            {data && data.me.username}
          </Typography>
          <Typography component="span" variant="subtitle2" gutterBottom>
            {data && data.me.email}
          </Typography>
        </div>
      )}

      <Button className={classes.signout} onClick={handleSignOut}>
        Sign Out
      </Button>
    </section>
  );
};

export { UserSwitcher };
