import React from 'react';

import { Fab, Icon, makeStyles } from '@material-ui/core';

import { NavBar } from '@components/nav/bar/bar.component';
import { NavDrawer } from '@components/nav/drawer/drawer.component';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 20,
    [theme.breakpoints.up('sm')]: {
      bottom: 36,
    },
    [theme.breakpoints.up('md')]: {
      bottom: 20,
    },
  },
}));

const MainPage: React.FunctionComponent = () => {
  const classes = useStyles({});
  const [navOpen, setNavOpen] = React.useState(false);

  return (
    <>
      <Fab className={classes.fab} color="secondary">
        <Icon>add</Icon>
      </Fab>
      <NavBar onMenu={() => setNavOpen(true)} onShare={() => {}} />
      <NavDrawer open={navOpen} onClose={() => setNavOpen(false)} />
    </>
  );
};

export { MainPage };
