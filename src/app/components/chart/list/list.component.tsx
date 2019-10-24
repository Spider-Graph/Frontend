import React from 'react';
import { QueryResult } from '@apollo/react-common';
import { useMutation } from '@apollo/react-hooks';

import { CircularProgress, Icon, Paper, Typography, makeStyles } from '@material-ui/core';

import { useUndux } from '@hooks/useUndux';
import { DeleteChart, DeleteChartVariables, DELETE_CHART } from '@graphql/mutations';
import { Charts } from '@graphql/queries';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  item: {
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
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
  const [, setError] = useUndux('error');

  const [deleteChart, deleteChartResponse] = useMutation<DeleteChart, DeleteChartVariables>(DELETE_CHART);

  React.useEffect(() => {
    if (deleteChartResponse.data) {
      if (deleteChartResponse.data.deleteChart.chart.id === selected) setSelected(null);
      charts.refetch();
    }
  }, [charts, selected, setSelected, deleteChartResponse]);

  React.useEffect(() => {
    if (deleteChartResponse.error) {
      setError(deleteChartResponse.error.message);
      deleteChartResponse.error = undefined;
    }

    if (charts.error) {
      setError(charts.error.message);
      charts.error = undefined;
    }
  }, [deleteChartResponse, charts, setError]);

  if (charts.loading)
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );

  if (!charts.data) return <div />;

  return (
    <div className={classes.root}>
      {charts.data.charts.map((chart) => (
        <Paper
          key={chart.id}
          className={selected === chart.id ? `${classes.item} ${classes.selected}` : classes.item}
          elevation={selected === chart.id ? 10 : 2}
        >
          <Typography
            className={selected === chart.id ? `${classes.text} ${classes.selectedText}` : classes.text}
            variant="button"
            onClick={() => setSelected(chart.id)}
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
