import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import {
  Button,
  Card,
  CircularProgress,
  Checkbox,
  Fade,
  Grow,
  Icon,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';

import { DatasetUI } from '@models/DatasetUI';
import { useUndux } from '@hooks/useUndux';
import { DeleteDataset, DeleteDatasetVariables, DELETE_DATASET } from '@graphql/mutations';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '85vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      width: '40vw',
    },
  },
  add: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1),
    margin: theme.spacing(2),
  },
  text: {
    flex: 1,
  },
}));

interface ChartDatasetsProps {
  datasets: DatasetUI[];
  onChange: (datasets: DatasetUI[]) => void;
  onDelete: () => void;
}

const ChartDatasets: React.FunctionComponent<ChartDatasetsProps> = ({ datasets, onChange, onDelete }) => {
  const classes = useStyles({});
  const history = useHistory();
  const [chart] = useUndux('chart');
  const [, setError] = useUndux('error');
  const [deleteDataset, deleteDatasetResponse] = useMutation<DeleteDataset, DeleteDatasetVariables>(DELETE_DATASET);

  React.useEffect(() => {
    if (!deleteDatasetResponse.data || !deleteDatasetResponse.data.deleteDataset.completed) return;
    const { id } = deleteDatasetResponse.data.deleteDataset.dataset;
    onChange(datasets.filter((dataset) => dataset.id !== id));
    onDelete();
    deleteDatasetResponse.data = undefined;
  }, [datasets, onChange, onDelete, deleteDatasetResponse]);

  React.useEffect(() => {
    if (deleteDatasetResponse.error) {
      setError(deleteDatasetResponse.error.message);
      deleteDatasetResponse.error = undefined;
    }
  }, [deleteDatasetResponse, setError]);

  const toggleEnabled = (index: number) => () => {
    const newDatasets = [...datasets];
    newDatasets[index].enabled = !newDatasets[index].enabled;
    onChange(newDatasets);
  };

  const deleteItem = (id: string) => {
    deleteDataset({ variables: { id, chart } });
  };

  if (deleteDatasetResponse.loading)
    return (
      <div className={classes.root}>
        <Fade in={deleteDatasetResponse.loading}>
          <CircularProgress />
        </Fade>
      </div>
    );

  return (
    <div className={classes.root}>
      <Fade in={datasets.length === 0}>
        <div className={classes.add}>
          <Button onClick={() => history.push('/dataset')}>ADD A DATASET</Button>
        </div>
      </Fade>

      {datasets.map((dataset, i) => (
        <Grow key={dataset.id} in={!!dataset.id}>
          <Card className={classes.card}>
            <Checkbox
              checked={dataset.enabled}
              onClick={() => toggleEnabled(i)()}
              style={{ color: dataset.backgroundColor }}
            />
            <Typography className={classes.text} variant="subtitle1" display="inline">
              {dataset.label}
            </Typography>
            <IconButton onClick={() => history.push(`/dataset/${dataset.id}`)}>
              <Icon>edit</Icon>
            </IconButton>
            <IconButton onClick={() => deleteItem(dataset.id)}>
              <Icon>delete</Icon>
            </IconButton>
          </Card>
        </Grow>
      ))}
    </div>
  );
};

export { ChartDatasets };
