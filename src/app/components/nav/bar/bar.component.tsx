import React from 'react';

import {
  AppBar,
  Fade,
  Icon,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';

import { circleInsetBar } from '@theme/vars.theme';
import { useUndux } from '@hooks/useUndux';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 10,
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
  title: {
    order: 2,
    [theme.breakpoints.up('md')]: {
      order: 0,
    },
  },
  edit: {
    order: 1,
    [theme.breakpoints.up('md')]: {
      order: 0,
    },
  },
  share: {},
}));

interface NavBarProps {
  onEdit: () => void;
  onMenu: () => void;
  onShare: () => void;
}

const NavBar: React.FunctionComponent<NavBarProps> = ({ onEdit, onMenu, onShare }) => {
  const classes = useStyles({});
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const [chart] = useUndux('chart');
  const [title] = useUndux('title');

  return (
    <Fade in={true}>
      <div>
        <AppBar position="fixed" color="secondary" className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={onMenu} aria-label="menu">
              <Icon>menu</Icon>
            </IconButton>
            {chart && (
              <>
                <Typography className={classes.title} variant="h5" component="h1">
                  {title}
                </Typography>
                <div className={classes.grow} />
                <IconButton
                  className={classes.edit}
                  edge={md ? 'end' : 'start'}
                  color="inherit"
                  onClick={onEdit}
                  aria-label="search"
                >
                  <Icon>edit</Icon>
                </IconButton>
                <IconButton
                  className={classes.share}
                  edge={md ? 'end' : 'start'}
                  color="inherit"
                  onClick={onShare}
                  aria-label="search"
                >
                  <Icon>share</Icon>
                </IconButton>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </Fade>
  );
};

export { NavBar };
