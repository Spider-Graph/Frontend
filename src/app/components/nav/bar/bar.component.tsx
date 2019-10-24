import React from 'react';

import { AppBar, Fade, Icon, IconButton, Toolbar, makeStyles } from '@material-ui/core';

import { circleInsetBar } from '@theme/vars.theme';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 10,
    height: theme.spacing(8),
    top: 'auto',
    bottom: 0,
    clipPath: circleInsetBar,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      bottom: 'unset',
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
  showShare: boolean;
  onMenu: () => void;
  onShare: () => void;
}

const NavBar: React.FunctionComponent<NavBarProps> = ({ showShare, onMenu, onShare }) => {
  const classes = useStyles({});

  return (
    <Fade in={true}>
      <div>
        <AppBar position="fixed" color="secondary" className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={onMenu} aria-label="menu">
              <Icon>menu</Icon>
            </IconButton>
            <div className={classes.grow} />
            {showShare && (
              <IconButton edge="end" color="inherit" onClick={onShare} aria-label="search">
                <Icon>share</Icon>
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </Fade>
  );
};

export { NavBar };
