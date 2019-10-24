import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  PropTypes,
} from '@material-ui/core';

type ConfirmProps = {
  action: () => void;
  cancelText: string;
  confirmText: string;
  confirmColor: PropTypes.Color;
  open: boolean;
  text: string;
  title: string;
  onClose: () => void;
};

const Confirm: React.FunctionComponent<ConfirmProps> = ({
  action,
  cancelText,
  confirmText,
  confirmColor,
  open,
  text,
  title,
  onClose,
}) => {
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
        <Button onClick={onClose} color="primary">
          {cancelText}
        </Button>
        <Button onClick={handleAction} color={confirmColor} autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { Confirm };
