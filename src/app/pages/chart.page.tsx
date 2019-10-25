import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory, useParams } from 'react-router-dom';

import { CircularProgress, Fade, Grow, Icon, IconButton, Typography, makeStyles } from '@material-ui/core';

import { ChangeChartDTO } from '@models/api';
import { useUndux } from '@hooks/useUndux';
import { ADD_CHART, AddChart, AddChartVariables } from '@graphql/mutations';
import { UPDATE_CHART, UpdateChart, UpdateChartVariables } from '@graphql/mutations';
import { ChartData, ChartDataVariables, CHART_DATA } from '@graphql/queries';

import { Input } from '@components/general/input/input.component';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    height: '100%',
    minHeight: 'calc(100vh - theme.spacing(9))',
  },
  loading: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    padding: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(9),
  },
  spacer: {
    flex: 1,
  },
  labelsOverline: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addIcon: {
    marginRight: theme.spacing(2),
  },
  bottomRow: {
    backgroundColor: theme.palette.secondary.main,
    height: theme.spacing(9),
    position: 'fixed',
    display: 'flex',
    justifyContent: 'space-between',
    bottom: 0,
    width: '100vw',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));

const ChartPage: React.FunctionComponent = () => {
  const classes = useStyles({});
  const history = useHistory();
  const { id } = useParams();

  const [, setID] = useUndux('chart');
  const [, setError] = useUndux('error');

  const [chart, setChart] = React.useState<ChangeChartDTO>({ title: '', labels: ['', '', ''] });
  const [exit, setExit] = React.useState(false);

  const [addChart, addChartResponse] = useMutation<AddChart, AddChartVariables>(ADD_CHART);
  const [updateChart, updateChartResponse] = useMutation<UpdateChart, UpdateChartVariables>(UPDATE_CHART);
  const chartDataResponse = useQuery<ChartData, ChartDataVariables>(CHART_DATA, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only',
  });

  React.useEffect(() => {
    if (!chartDataResponse.data) return;
    const { title, labels } = chartDataResponse.data.chart;
    setChart({ title, labels });
  }, [setChart, chartDataResponse]);

  React.useEffect(() => {
    const addedChart = addChartResponse.data && addChartResponse.data.addChart.completed;
    const updatedChart = updateChartResponse.data && updateChartResponse.data.updateChart.completed;

    if (addedChart) setID(addChartResponse.data.addChart.chart.id);
    if (addedChart) history.goBack();
    if (updatedChart) history.goBack();
  }, [history, setID, addChartResponse, updateChartResponse]);

  React.useEffect(() => {
    if (addChartResponse.error) {
      setError(addChartResponse.error.message);
      addChartResponse.error = undefined;
    }

    if (updateChartResponse.error) {
      setError(updateChartResponse.error.message);
      updateChartResponse.error = undefined;
    }

    if (chartDataResponse.error) {
      setError(chartDataResponse.error.message);
      chartDataResponse.error = undefined;
    }
  }, [addChartResponse, updateChartResponse, chartDataResponse, setError]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (id) updateChart({ variables: { id, chart } });
    else addChart({ variables: { chart } });
  };

  const handleChange = (key: string) => (value: string | string[] | number) => {
    setChart({
      ...chart,
      [key]: value,
    });
  };

  const addLabel = () => handleChange('labels')([...chart.labels, '']);

  const setLabel = (index: number) => (label: string) => {
    const newLabels = [...chart.labels];
    newLabels[index] = label;
    handleChange('labels')(newLabels);
  };

  const removeLabel = (index: number) => {
    const newLabels = [...chart.labels];
    newLabels.splice(index, 1);
    handleChange('labels')(newLabels);
  };

  const goBack = () => {
    setExit(true);
    setTimeout(() => history.push('/'), 300);
  };

  const loading = chartDataResponse.loading || addChartResponse.loading || updateChartResponse.loading;
  return (
    <Fade in={!exit}>
      <div className={classes.root}>
        <Fade in={loading}>
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        </Fade>
        <Fade in={!loading}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Typography variant="overline">Chart</Typography>
            <Grow in={true}>
              <Input label="Title" ariaLabel={`Title`} value={chart.title} onChange={handleChange('title')} />
            </Grow>
            <div className={classes.labelsOverline}>
              <Typography variant="overline">Labels</Typography>
              <IconButton className={classes.addIcon} color="inherit" onClick={() => addLabel()}>
                <Icon>add_circle_outline</Icon>
              </IconButton>
            </div>
            {chart.labels.map((item, i) => (
              <Grow key={i} in={true}>
                <Input
                  label={`Label ${i + 1}`}
                  ariaLabel={`Label ${i + 1}`}
                  trailingIcon="remove"
                  value={item}
                  onChange={setLabel(i)}
                  onClick={() => removeLabel(i)}
                />
              </Grow>
            ))}
          </form>
        </Fade>
        <Fade in={!loading}>
        <div className={classes.bottomRow}>
          <div className={classes.icon}>
            <IconButton color="inherit" onClick={() => goBack()}>
              <Icon>arrow_back</Icon>
            </IconButton>
          </div>
          <div className={classes.icon}>
            <IconButton color="inherit" onClick={() => handleSubmit()}>
              <Icon>library_add</Icon>
            </IconButton>
          </div>
        </div>
        </Fade>
      </div>
    </Fade>
  );
};

export { ChartPage };
