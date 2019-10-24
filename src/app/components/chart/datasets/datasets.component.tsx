import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { Card, CardContent, CircularProgress, Checkbox, Icon, IconButton, Typography } from '@material-ui/core';

import { DatasetUI } from '@models/DatasetUI';
import { useUndux } from '@hooks/useUndux';
import { DeleteDataset, DeleteDatasetVariables, DELETE_DATASET } from '@graphql/mutations';

interface ChartDatasetsProps {
  datasets: DatasetUI[];
  onChange: (datasets: DatasetUI[]) => void;
  onDelete: () => void;
}

const ChartDatasets: React.FunctionComponent<ChartDatasetsProps> = ({ datasets, onChange, onDelete }) => {
  const history = useHistory();
  const [chart] = useUndux('chart');
  const [deleteDataset, deleteDatasetResponse] = useMutation<DeleteDataset, DeleteDatasetVariables>(DELETE_DATASET);

  React.useEffect(() => {
    if (!deleteDatasetResponse.data || !deleteDatasetResponse.data.deleteDataset.completed) return;
    const { id } = deleteDatasetResponse.data.deleteDataset.dataset;
    onChange(datasets.filter((dataset) => dataset.id !== id));
    onDelete();
  }, [deleteDatasetResponse]);

  const toggleEnabled = (index: number) => () => {
    const newDatasets = [...datasets];
    newDatasets[index].enabled = !newDatasets[index].enabled;
    onChange(newDatasets);
  };

  const deleteItem = (id: string) => {
    deleteDataset({ variables: { id, chart } });
  };

  if (deleteDatasetResponse.loading) return <CircularProgress />;

  return (
    <>
      {datasets.map((dataset, i) => (
        <Card key={dataset.id}>
          <CardContent>
            <Checkbox checked={dataset.enabled} onClick={() => toggleEnabled(i)()} />
            <Typography variant="subtitle1">{dataset.label}</Typography>
            <IconButton onClick={() => history.push(`/dataset/${dataset.id}`)}>
              <Icon>edit</Icon>
            </IconButton>
            <IconButton onClick={() => deleteItem(dataset.id)}>
              <Icon>delete</Icon>
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export { ChartDatasets };
