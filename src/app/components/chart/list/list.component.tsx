import React from 'react';
import { QueryResult } from '@apollo/react-common';
import { useMutation } from '@apollo/react-hooks';

import { CircularProgress, Icon, Paper, Typography, makeStyles } from '@material-ui/core';

import { ChartUI } from '@models/ChartUI';
import { useUndux } from '@hooks/useUndux';
import { DeleteChart, DeleteChartVariables, DELETE_CHART } from '@graphql/mutations';
import { Charts } from '@graphql/queries';

import { Confirm } from '@components/general/confirm/confirm.component';

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
    margin: theme.spacing(2),
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
  const [, setTitle] = useUndux('title');
  const [, setError] = useUndux('error');

  const [list, setList] = React.useState<ChartUI[]>([]);

  const [deleteChart, deleteChartResponse] = useMutation<DeleteChart, DeleteChartVariables>(DELETE_CHART);

  React.useEffect(() => {
    if (deleteChartResponse.data) {
      const deletedSelected = deleteChartResponse.data.deleteChart.chart.id === selected;
      if (deletedSelected) setSelected(null);
      if (deletedSelected) setTitle('');
      charts.refetch();
    }
  }, [charts, selected, setSelected, setTitle, deleteChartResponse]);

  React.useEffect(() => {
    if (charts.data) {
      setList(charts.data.charts.map((chart) => ({ ...chart, deleting: false })));
    }
  }, [charts]);

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

  const select = (id: string, title: string) => {
    setSelected(id);
    setTitle(title);
  };

  const setDeleting = (id: string, deleting: boolean) => {
    setList(list.map((chart) => (chart.id === id ? { ...chart, deleting } : chart)));
  };

  if (charts.loading)
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );

  return (
    <div className={classes.root}>
      {list &&
        list.map((chart) => (
          <>
            <Paper
              key={chart.id}
              className={selected === chart.id ? `${classes.item} ${classes.selected}` : classes.item}
              elevation={selected === chart.id ? 10 : 2}
            >
              <Typography
                className={selected === chart.id ? `${classes.text} ${classes.selectedText}` : classes.text}
                variant="button"
                onClick={() => select(chart.id, chart.title)}
              >
                {chart.title}
              </Typography>
              <Icon color="inherit" onClick={() => setDeleting(chart.id, true)}>
                delete
              </Icon>
            </Paper>
            <Confirm
              action={() => deleteChart({ variables: { id: chart.id } })}
              title={`Delete ${chart.title}`}
              text="Are you sure you want to delete this chart?"
              confirmText="Delete"
              cancelText="Cancel"
              open={chart.deleting}
              onClose={() => setDeleting(chart.id, false)}
            />
          </>
        ))}
    </div>
  );
};

export { ChartList };
