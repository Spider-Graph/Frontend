import React from 'react';

import { makeStyles } from '@material-ui/core';
import { Icon, InputBase, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    marginTop: 15,
  },
  input: {
    marginLeft: theme.spacing(0.5),
    paddingTop: 8,
    paddingBottom: 8,
    flex: 1,
  },
  icon: {
    padding: 10,
    paddingTop: 13,
    paddingBottom: 7,
    color: theme.palette.grey[700],
  },
}));

type InputProps = {
  className?: string;
  leadingIcon?: string;
  trailingIcon?: string;
  elevation?: number;
  disabled?: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
};

const Input: React.FunctionComponent<InputProps> = ({
  className,
  leadingIcon,
  trailingIcon,
  elevation,
  disabled,
  placeholder,
  style,
  type,
  value,
  onChange,
  ariaLabel,
}) => {
  const classes = useStyles({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Paper className={`${classes.root} ${className}`} elevation={elevation} style={style}>
      {leadingIcon && (
        <div className={classes.icon}>
          <Icon>{leadingIcon}</Icon>
        </div>
      )}

      <InputBase
        className={classes.input}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleChange}
        inputProps={{ 'aria-label': ariaLabel }}
      />

      {trailingIcon && (
        <div className={classes.icon}>
          <Icon>{trailingIcon}</Icon>
        </div>
      )}
    </Paper>
  );
};

export { Input };
