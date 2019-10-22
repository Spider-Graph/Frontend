import React from 'react';

import { Drawer, Divider, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';

import { ChartList } from '@components/chart/list/list.component';
import { UserSwitcher } from '@components/user/switcher/switcher.component';

const useStyles = makeStyles({
  drawer: {
    padding: 10,
    minWidth: '260px',
  },
  divider: {},
});

interface NavDrawerProps {
  open: boolean;
  onClose: () => void;
}

const NavDrawer: React.FunctionComponent<NavDrawerProps> = ({ open, onClose }) => {
  const classes = useStyles({});
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Drawer anchor={md ? 'left' : 'bottom'} open={open} onClose={onClose}>
      <aside className={classes.drawer}>
        <UserSwitcher />
        <Divider className={classes.divider} />
        <ChartList />
      </aside>
    </Drawer>
  );
};

export { NavDrawer };
