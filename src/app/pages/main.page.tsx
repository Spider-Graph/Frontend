import React from 'react';
import { useHistory } from 'react-router-dom';

import { Icon, makeStyles } from '@material-ui/core';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';

import { StoreService } from '@services/store.service';
import { ChartDisplay } from '@components/chart/display/display.component';
import { NavBar } from '@components/nav/bar/bar.component';
import { NavDrawer } from '@components/nav/drawer/drawer.component';

const useStyles = makeStyles(theme => ({
  speedDial: {
    position: 'fixed',
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
  const history = useHistory();
  const store = StoreService.useStore();
  const id = store.get('chart');
  const [nav, setNav] = React.useState(false);
  const [speedDial, setSpeedDial] = React.useState(false);
  const actions = [
    { icon: <Icon>bar_chart</Icon>, name: 'Add Dataset', link: '/dataset' },
    { icon: <Icon>pie_chart</Icon>, name: 'Add Chart', link: '/chart' },
  ];

  React.useEffect(() => {
    setNav(false);
  }, [id]);

  return (
    <>
      <NavBar onMenu={() => setNav(true)} onShare={() => {}} />
      {id && <ChartDisplay id={id} />}
      <SpeedDial
        className={classes.speedDial}
        FabProps={{ color: 'secondary' }}
        open={speedDial}
        onOpen={() => setSpeedDial(true)}
        onClose={() => setSpeedDial(false)}
        icon={<SpeedDialIcon />}
        ariaLabel="Add"
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            onClick={() => history.push(action.link)}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      <NavDrawer open={nav} onClose={() => setNav(false)} />
    </>
  );
};

export { MainPage };
