import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Button, CircularProgress, makeStyles } from '@material-ui/core';

import { useUndux } from '@hooks/useUndux';
import { Charts, CHARTS } from '@graphql/queries';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
  },
  category: {
    marginBottom: 5,
  },
}));

const ChartList: React.FunctionComponent = () => {
  const classes = useStyles({});
  const list = useQuery<Charts, null>(CHARTS, { pollInterval: 500 });
  const [selected, setSelected] = useUndux('chart');

  if (list.loading) return <CircularProgress />;

  return (
    <div className={classes.root}>
      {list.data.charts.map((chart) => (
        <Button
          className={classes.category}
          key={chart.id}
          color={selected === chart.id ? 'primary' : 'default'}
          variant={selected === chart.id ? 'contained' : 'text'}
          onClick={() => setSelected(selected === chart.id ? null : chart.id)}
        >
          {chart.title}
        </Button>
      ))}
    </div>
  );
};

export { ChartList };
