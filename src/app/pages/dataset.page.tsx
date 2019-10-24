import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Redirect, useHistory, useParams } from 'react-router-dom';

import { CircularProgress, Icon, IconButton, Typography, makeStyles } from '@material-ui/core';

import { ChangeDatasetDTO } from '@models/api';
import { useUndux } from '@hooks/useUndux';
import { ADD_DATASET, AddDataset, AddDatasetVariables } from '@graphql/mutations';
import { UPDATE_DATASET, UpdateDataset, UpdateDatasetVariables } from '@graphql/mutations';
import { ChartData, ChartDataVariables, CHART_DATA } from '@graphql/queries';
import { Dataset, DatasetVariables, DATASET } from '@graphql/queries';
import { Input } from '@components/general/input/input.component';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    height: '100%',
    minHeight: '100vh',
    width: '100vw',
  },
  form: {
    padding: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(9),
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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

const DatasetPage: React.FunctionComponent = () => {
  const classes = useStyles({});
  const history = useHistory();
  const { id } = useParams();

  const [chart] = useUndux('chart');
  const [, setError] = useUndux('error');

  const [dataset, setDataset] = React.useState<ChangeDatasetDTO>({ label: '', data: [] });

  const [addDataset, addDatasetResponse] = useMutation<AddDataset, AddDatasetVariables>(ADD_DATASET);
  const [updateDataset, updateDatasetResponse] = useMutation<UpdateDataset, UpdateDatasetVariables>(UPDATE_DATASET);
  const chartDataResponse = useQuery<ChartData, ChartDataVariables>(CHART_DATA, {
    variables: { id: chart },
    skip: !chart,
    fetchPolicy: 'network-only',
  });
  const datasetResponse = useQuery<Dataset, DatasetVariables>(DATASET, {
    variables: { id: id, chart },
    skip: !id || !chart,
    fetchPolicy: 'network-only',
  });

  React.useEffect(() => {
    if (datasetResponse.data) {
      const { data, label } = datasetResponse.data.dataset;
      setDataset({ data, label });
    } else if (chartDataResponse.data) {
      const data = new Array<number>(chartDataResponse.data.chart.labels.length);
      data.fill(50);
      setDataset({ data, label: '' });
    }
  }, [chartDataResponse, datasetResponse, setDataset]);

  React.useEffect(() => {
    const addedDataset = addDatasetResponse.data && addDatasetResponse.data.addDataset.completed;
    const updatedDataset = updateDatasetResponse.data && updateDatasetResponse.data.updateDataset.completed;

    if (addedDataset) history.goBack();
    if (updatedDataset) history.goBack();
  }, [history, addDatasetResponse, updateDatasetResponse]);

  React.useEffect(() => {
    if (addDatasetResponse.error) {
      setError(addDatasetResponse.error.message);
      addDatasetResponse.error = undefined;
    }

    if (updateDatasetResponse.error) {
      setError(updateDatasetResponse.error.message);
      updateDatasetResponse.error = undefined;
    }

    if (chartDataResponse.error) {
      setError(chartDataResponse.error.message);
      chartDataResponse.error = undefined;
    }
  }, [addDatasetResponse, updateDatasetResponse, chartDataResponse, setError]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (id) updateDataset({ variables: { chart, id, dataset } });
    else addDataset({ variables: { chart, dataset } });
  };

  const handleChange = (key: string) => (value: string | number | number[]) => {
    setDataset({
      ...dataset,
      [key]: value,
    });
  };

  const setData = (index: number) => (edit: number) => {
    const newData = [...dataset.data];
    newData[index] = edit;
    handleChange('data')(newData);
  };

  if (chartDataResponse.loading || datasetResponse.loading) return <CircularProgress />;
  if (!chartDataResponse.data) return <Redirect to="/" />;
  const { labels } = chartDataResponse.data.chart;
  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="overline">Dataset</Typography>
        <Input label="Label" value={dataset.label} onChange={handleChange('label')} />
        <Typography variant="overline">Values</Typography>
        <div className={classes.grid}>
          {dataset.data.length !== 0 &&
            labels.map((item, i) => (
              <Input key={i} label={item} type="number" value={dataset.data[i]} onChange={setData(i)} />
            ))}
        </div>
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

export { DatasetPage };
