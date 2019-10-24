import React from 'react';
import { useHistory } from 'react-router-dom';

import { Card, CardContent, Checkbox, Icon, IconButton, Typography } from '@material-ui/core';

import { DatasetUI } from '@models/DatasetUI';

interface ChartDatasetsProps {
  datasets: DatasetUI[];
  onChange: (datasets: DatasetUI[]) => void;
}

const ChartDatasets: React.FunctionComponent<ChartDatasetsProps> = ({ datasets, onChange }) => {
  const history = useHistory();

  const toggleEnabled = (index: number) => () => {
    const newDatasets = [...datasets];
    newDatasets[index].enabled = !newDatasets[index].enabled;
    onChange(newDatasets);
  };

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
            <IconButton>
              <Icon>delete</Icon>
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export { ChartDatasets };
