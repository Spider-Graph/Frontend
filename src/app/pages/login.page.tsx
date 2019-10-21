import React from 'react';
import { UserForm } from '@components/user/form/form.component';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary['900'],
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const LoginPage: React.FunctionComponent = () => {
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <UserForm button="login" onLink={() => {}} onSubmit={() => {}} email />
    </div>
  );
};

export { LoginPage };
