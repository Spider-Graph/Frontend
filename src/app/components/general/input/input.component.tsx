import React from 'react';

import { Icon, IconButton, TextField, Paper, makeStyles } from '@material-ui/core';

interface StyleProps {
  label: string;
  leadingIcon: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    margin: theme.spacing(2),
    height: 64,
  },
  padding: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  input: ({ label, leadingIcon }: StyleProps) => ({
    marginTop: label ? theme.spacing(1.5) * -1 : 0,
    marginLeft: !leadingIcon ? theme.spacing(2) : 0,
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
  value?: string | number;
  onChange?: (value: string | number) => void;
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
    const change: string | number = type === 'number' && e.target.value ? e.target.valueAsNumber : e.target.value;
    if (onChange) onChange(change);
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
