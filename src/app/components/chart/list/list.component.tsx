import React from 'react';
import { QueryResult } from '@apollo/react-common';
import { useMutation } from '@apollo/react-hooks';

import { Paper, CircularProgress, Icon, Typography, makeStyles } from '@material-ui/core';

import { useUndux } from '@hooks/useUndux';
import { DeleteChart, DeleteChartVariables, DELETE_CHART } from '@graphql/mutations';
import { Charts } from '@graphql/queries';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
  },
  item: {
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  text: {
    color: theme.palette.text.primary,
    flex: 1,
  },
  selectedText: {
    color: theme.palette.primary.contrastText,
  },
}));

interface ChartListProps {
  charts: QueryResult<Charts, null>;
}

const ChartList: React.FunctionComponent<ChartListProps> = ({ charts }) => {
  const classes = useStyles({});
  const [selected, setSelected] = useUndux('chart');
  const [deleteChart, deleteChartResponse] = useMutation<DeleteChart, DeleteChartVariables>(DELETE_CHART);
  const { data, loading, refetch } = charts;

  React.useEffect(() => {
    refetch();
  }, [deleteChartResponse, refetch]);

  if (loading) return <CircularProgress />;

  return (
    <div className={classes.root}>
      {data.charts.map((chart) => (
        <Paper
          key={chart.id}
          className={selected === chart.id ? `${classes.item} ${classes.selected}` : classes.item}
          elevation={selected === chart.id ? 10 : 2}
        >
          <Typography
            className={selected === chart.id ? `${classes.text} ${classes.selectedText}` : classes.text}
            variant="button"
            onClick={() => setSelected(selected === chart.id ? null : chart.id)}
          >
            {chart.title}
          </Typography>
          <Icon color="inherit" onClick={() => deleteChart({ variables: { id: chart.id } })}>
            delete
          </Icon>
        </Paper>
      ))}
    </div>
  );
};

export { ChartList };
