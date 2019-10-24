import React from 'react';

import { Toolbar, IconButton, AppBar, makeStyles, Icon } from '@material-ui/core';

import { circleInsetBar } from '@theme/vars.theme';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    clipPath: circleInsetBar,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      clipPath: 'unset',
    },
  },
  grow: {
    [theme.breakpoints.up('md')]: {
      flexGrow: 1,
    },
  },
}));

interface NavBarProps {
  onMenu: () => void;
  onShare: () => void;
}

const NavBar: React.FunctionComponent<NavBarProps> = ({ onMenu, onShare }) => {
  const classes = useStyles({});
  return (
    <>
      <AppBar position="fixed" color="secondary" className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" onClick={onMenu} aria-label="menu">
            <Icon>menu</Icon>
          </IconButton>
          <div className={classes.grow} />
          <IconButton edge="end" color="inherit" onClick={onShare} aria-label="search">
            <Icon>share</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export { NavBar };
