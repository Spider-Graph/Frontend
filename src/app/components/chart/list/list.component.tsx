import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Button, CircularProgress, makeStyles } from '@material-ui/core';

import { StoreService } from '@services/store.service';
import { Charts, CHARTS } from '@graphql/queries';

import { ChartDTO } from '@models/api';

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
  const store = StoreService.useStore();
  const list = useQuery<Charts, null>(CHARTS);
  const selected = store.get('chart');

  if (list.loading) return <CircularProgress />;

  return (
    <div className={classes.root}>
      {list.data.charts.map((chart) => (
        <Button
          className={classes.category}
          key={chart.id}
          color={selected === chart.id ? 'secondary' : 'default'}
          variant={selected === chart.id ? 'contained' : 'text'}
          onClick={() => store.set('chart')(selected === chart.id ? null : chart.id)}>
          {chart.title}
        </Button>
      ))}
    </div>
  );
};

export { ChartList };
