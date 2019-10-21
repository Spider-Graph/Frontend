import React from 'react';

import {
  Snackbar,
  SnackbarContent,
  Icon,
  makeStyles,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  error: {
    backgroundColor: theme.palette.error.light,
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const Error: React.FunctionComponent = () => {
  const classes = useStyles({});
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const [state, setState] = React.useState({
    open: false,
    error: '',
  });

  //TODO: Effects that update error on global state change.

  const { error, open } = state;
  return (
    <Snackbar
      autoHideDuration={2000}
      anchorOrigin={{
        vertical: md ? 'bottom' : 'top',
        horizontal: md ? 'left' : 'center',
      }}
      open={open}
      onClose={() => setState({ ...state, open: false })}
    >
      <SnackbarContent
        className={classes.error}
        message={
          <span className={classes.message}>
            <Icon className={classes.icon}>error</Icon>
            {error}
          </span>
        }
      />
    </Snackbar>
  );
};

export { Error };
