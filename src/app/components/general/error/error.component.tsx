import React from 'react';

import {
  Snackbar,
  SnackbarContent,
  Icon,
  makeStyles,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';

import { StoreService } from '@services/store.service';

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
  const store = StoreService.useStore();
  const error = store.get('error');
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (error) setOpen(true);
  }, [error]);

  const removeError = () => {
    setOpen(false);
    setTimeout(() => store.set('error')(null), 200);
  };

  return (
    <Snackbar
      autoHideDuration={2000}
      anchorOrigin={{
        vertical: md ? 'bottom' : 'top',
        horizontal: md ? 'left' : 'center',
      }}
      open={open}
      onClose={() => removeError()}
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
