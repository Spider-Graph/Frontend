import React from 'react';
import { useHistory } from 'react-router-dom';

import { Icon, makeStyles } from '@material-ui/core';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';

import { useUndux } from '@hooks/useUndux';
import { ChartDisplay } from '@components/chart/display/display.component';
import { NavBar } from '@components/nav/bar/bar.component';
import { NavDrawer } from '@components/nav/drawer/drawer.component';

const useStyles = makeStyles((theme) => ({
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

interface Action {
  icon: JSX.Element;
  name: string;
  link: string;
  chartRequired: boolean;
}

const MainPage: React.FunctionComponent = () => {
  const classes = useStyles({});
  const history = useHistory();

  const [id] = useUndux('chart');
  const [nav, setNav] = React.useState(false);
  const [speedDial, setSpeedDial] = React.useState(false);

  const [actions, setActions] = React.useState<Action[]>([]);
  const [availableActions] = React.useState<Action[]>([
    { icon: <Icon>bar_chart</Icon>, name: 'Add Dataset', link: '/dataset', chartRequired: true },
    { icon: <Icon>pie_chart</Icon>, name: 'Add Chart', link: '/chart', chartRequired: false },
  ]);

  React.useEffect(() => {
    if (id) setActions(availableActions);
    else setActions(availableActions.filter((action) => !action.chartRequired));
    setNav(false);
  }, [availableActions, setActions, id]);

  return (
    <>
      <NavBar onMenu={() => setNav(true)} onShare={() => {}} />
      {id && <ChartDisplay id={id} />}
      <SpeedDial
        className={classes.speedDial}
        open={speedDial}
        onOpen={() => setSpeedDial(true)}
        onClose={() => setSpeedDial(false)}
        icon={<SpeedDialIcon />}
        ariaLabel="Add"
      >
        {actions.map((action) => (
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
