import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  confirm: {
    color: theme.palette.error.main,
  },
}));

type ConfirmProps = {
  action: () => void;
  cancelText: string;
  confirmText: string;
  open: boolean;
  text: string;
  title: string;
  onClose: () => void;
};

const Confirm: React.FunctionComponent<ConfirmProps> = ({
  action,
  cancelText,
  confirmText,
  open,
  text,
  title,
  onClose,
}) => {
  const classes = useStyles({});

  const handleAction = () => {
    action();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button className={classes.confirm} onClick={handleAction} autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { Confirm };
