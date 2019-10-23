import React from 'react';

import { Icon, IconButton, TextField, Paper, makeStyles } from '@material-ui/core';

interface StyleProps {
  label: string;
  leadingIcon: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    marginTop: 15,
    height: 56,
  },
  padding: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  input: ({ label, leadingIcon }: StyleProps) => ({
    marginTop: label ? -11 : 0,
    marginLeft: !leadingIcon ? 10 : 0,
    flex: 1,
  }),
  icon: {
    height: 24,
    color: theme.palette.grey[700],
  },
}));

type InputProps = {
  className?: string;
  leadingIcon?: string;
  trailingIcon?: string;
  elevation?: number;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
  style?: React.CSSProperties;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  onClick?: () => void;
  ariaLabel?: string;
};

const Input: React.FunctionComponent<InputProps> = ({
  className,
  leadingIcon,
  trailingIcon,
  elevation,
  disabled,
  label,
  placeholder,
  required,
  style,
  type,
  value,
  onChange,
  onClick,
  ariaLabel,
}) => {
  const classes = useStyles({ label, leadingIcon });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Paper className={`${classes.root} ${className}`} elevation={elevation} style={style}>
      <div className={classes.padding}>
        {leadingIcon && (
          <IconButton disabled={!onClick} onClick={onClick}>
            <Icon className={classes.icon}>{leadingIcon}</Icon>
          </IconButton>
        )}

        <TextField
          className={classes.input}
          disabled={disabled}
          label={label}
          placeholder={placeholder}
          required={required}
          type={type}
          value={value}
          onChange={handleChange}
          inputProps={{ 'aria-label': ariaLabel }}
          InputProps={{ disableUnderline: true, color: 'secondary' }}
        />

        {trailingIcon && (
          <IconButton disabled={!onClick} onClick={onClick}>
            <Icon className={classes.icon}>{trailingIcon}</Icon>
          </IconButton>
        )}
      </div>
    </Paper>
  );
};

export { Input };
