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

import { Confirm } from '@components/general/confirm/confirm.component';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(11),
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
      width: '40vw',
    },
  },
  hide: {
    display: 'none',
  },
  loading: {
    position: 'absolute',
  },
  none: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datasets: {
    justifySelf: 'center',
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

  const setDeleting = (id: string, deleting: boolean) => {
    onChange(datasets.map((dataset) => (dataset.id === id ? { ...dataset, deleting } : dataset)));
  };

  const deleteItem = (id: string) => {
    deleteDataset({ variables: { id, chart } });
  };

  const loading = deleteDatasetResponse.loading;

  return (
    <div className={classes.root}>
      <div className={loading || datasets.length === 0 ? classes.none : classes.hide}>
        <Fade in={loading}>
          <CircularProgress className={classes.loading} />
        </Fade>

        <Fade in={datasets.length === 0}>
          <Button onClick={() => history.push('/dataset')}>ADD A DATASET</Button>
        </Fade>
      </div>

      <div className={classes.datasets}>
        {datasets.map((dataset, i) => (
          <div key={dataset.id}>
            <Grow in={!!dataset.id && !loading}>
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
                <IconButton onClick={() => setDeleting(dataset.id, true)}>
                  <Icon>delete</Icon>
                </IconButton>
              </Card>
            </Grow>
            <Confirm
              action={() => deleteItem(dataset.id)}
              title={`Delete ${dataset.label}`}
              text="Are you sure you want to delete this dataset?"
              confirmText="Delete"
              cancelText="Cancel"
              open={dataset.deleting}
              onClose={() => setDeleting(dataset.id, false)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { ChartDatasets };
