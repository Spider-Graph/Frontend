import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { Icon, IconButton, Typography, makeStyles } from '@material-ui/core';

import { ChangeChartDTO } from '@models/api';
import { StoreService } from '@services/store.service';
import { ADD_CHART, AddChart, AddChartVariables } from '@graphql/mutations';
import { UPDATE_CHART, UpdateChart, UpdateChartVariables } from '@graphql/mutations';
import { ChartData, ChartDataVariables, CHART_DATA } from '@graphql/queries';
import { Dataset, DatasetVariables, DATASET } from '@graphql/queries';
import { Input } from '@components/general/input/input.component';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    height: '100vh',
    width: '100vw',
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    width: '100vw',
  },
  form: {
    padding: 10,
  },
}));

const ChartPage: React.FunctionComponent = () => {
  const classes = useStyles({});
  const history = useHistory();
  const { id } = useParams();

  // const id = 'ca063dd0-f3ce-11e9-ae6e-171e9b0f4907';

  const [chart, setChart] = React.useState<ChangeChartDTO>({ title: '', labels: ['', '', ''] });

  const [addChart, addChartResponse] = useMutation<AddChart, AddChartVariables>(ADD_CHART);
  const [updateChart, updateChartResponse] = useMutation<UpdateChart, UpdateChartVariables>(
    UPDATE_CHART
  );
  const chartDataResponse = useQuery<ChartData, ChartDataVariables>(CHART_DATA, {
    variables: { id },
  });

  React.useEffect(() => {
    if (!chartDataResponse.data) return;
    const { title, labels } = chartDataResponse.data.chart;
    setChart({ title, labels });
  }, [setChart, chartDataResponse]);

  React.useEffect(() => {
    if (addChartResponse.data && addChartResponse.data.addChart.completed) history.goBack();
    if (updateChartResponse.data && updateChartResponse.data.updateChart.completed)
      history.goBack();
  }, [addChartResponse, updateChartResponse, history]);

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

  const setLabel = (index: number) => (label: string) => {
    const newLabels = [...chart.labels];
    newLabels[index] = label;
    handleChange('labels')(newLabels);
  };

  const addLabel = () => handleChange('labels')([...chart.labels, '']);

  const removeLabel = (index: number) => {
    const newLabels = [...chart.labels];
    newLabels.splice(index, 1);
    handleChange('labels')(newLabels);
  };

  if (chartDataResponse.loading) return <> </>;
  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="overline">Chart</Typography>
        <Input label="Title" value={chart.title} onChange={handleChange('title')} />
        <Typography variant="overline">Labels</Typography>
        <IconButton color="inherit" onClick={() => addLabel()}>
          <Icon>add_circle_outline</Icon>
        </IconButton>
        {chart.labels.map((item, i) => {
          return (
            <Input
              key={i}
              label={`Label ${i + 1}`}
              trailingIcon="remove"
              value={item}
              onChange={setLabel(i)}
              onClick={() => removeLabel(i)}
            />
          );
        })}
      </form>
      <div className={classes.bottomRow}>
        <IconButton color="inherit" onClick={() => history.goBack()}>
          <Icon>arrow_back</Icon>
        </IconButton>
        <IconButton color="inherit" onClick={() => handleSubmit()}>
          <Icon>library_add</Icon>
        </IconButton>
      </div>
    </div>
  );
};

export { ChartPage };
