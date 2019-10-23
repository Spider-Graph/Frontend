import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { Icon, IconButton, Typography, makeStyles } from '@material-ui/core';

import { ChartData, ChartDataVariables, CHART_DATA } from '@graphql/queries';
import { Dataset, DatasetVariables, DATASET } from '@graphql/queries';
import { Input } from '@components/general/input/input.component';
import { StoreService } from '@services/store.service';
import { ADD_DATASET, AddDataset, AddDatasetVariables } from '@graphql/mutations';
import { ChangeDatasetDTO } from '@models/api';

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

const DatasetPage: React.FunctionComponent = () => {
  const classes = useStyles({});
  const history = useHistory();
  // const { id } = useParams();
  const store = StoreService.useStore();
  const chart = store.get('chart');
  const id = '';
  // const chart = 'ca063dd0-f3ce-11e9-ae6e-171e9b0f4907';

  const [dataset, setDataset] = React.useState<ChangeDatasetDTO>({ label: '', data: [] });

  const [addDataset, addDatasetResponse] = useMutation<AddDataset, AddDatasetVariables>(
    ADD_DATASET
  );
  const chartDataResponse = useQuery<ChartData, ChartDataVariables>(CHART_DATA, {
    variables: { id: chart },
  });
  const datasetResponse = useQuery<Dataset, DatasetVariables>(DATASET, {
    variables: { id: id || '', chart },
  });

  React.useEffect(() => {
    if (datasetResponse.data) {
      const { data, label } = datasetResponse.data.dataset;
      setDataset({ data, label });
    } else if (chartDataResponse.data) {
      const data = new Array<number>(chartDataResponse.data.chart.labels.length);
      data.fill(0);
      setDataset({ ...dataset, data });
    }
  }, [setDataset, datasetResponse, chartDataResponse]);

  React.useEffect(() => {
    if (!addDatasetResponse.data) return;
    if (addDatasetResponse.data.addDataset.completed) history.goBack();
  }, [addDatasetResponse, history]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    console.log(dataset);
    addDataset({
      variables: { chart, dataset },
    });
  };

  const handleChange = (key: string) => (value: string | number | number[]) => {
    setDataset({
      ...dataset,
      [key]: value,
    });
  };

  const setData = (index: number) => (edit: number) => {
    console.log(typeof edit);
    const newData = [...dataset.data];
    newData[index] = edit;
    handleChange('data')(newData);
  };

  if (chartDataResponse.loading || datasetResponse.loading) return <> </>;
  const { labels } = chartDataResponse.data.chart;
  console.log(dataset.data);
  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="overline">Dataset</Typography>
        <Input label="Label" value={dataset.label} onChange={handleChange('label')} />
        <Typography variant="overline">Values</Typography>
        {dataset.data.length !== 0 &&
          labels.map((item, i) => {
            return (
              <Input
                key={i}
                label={item}
                type="number"
                value={dataset.data[i]}
                onChange={setData(i)}
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

export { DatasetPage };
