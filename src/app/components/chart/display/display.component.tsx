import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { Radar } from 'react-chartjs-2';

import { CircularProgress, Icon, IconButton, Typography, makeStyles } from '@material-ui/core';

import { DatasetUI } from '@models/DatasetUI';
import { getRandomColor } from '@utils/randomColorMaker';
import { Chart, ChartVariables, CHART } from '@graphql/queries';
import { ChartDatasets } from '@components/chart/datasets/datasets.component';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(3),
  },
  chart: {
    width: '100%',
    maxWidth: '500px',
  },
  layout: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',

    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: `calc(100% - ${theme.spacing(3)}px)`,
    },
  },
}));

interface ChartDisplayProps {
  id: string;
}

const ChartDisplay: React.FunctionComponent<ChartDisplayProps> = ({ id }) => {
  const classes = useStyles({});
  const history = useHistory();

  const { data, loading, refetch } = useQuery<Chart, ChartVariables>(CHART, { variables: { id } });
  const [allDatasets, setAllDatasets] = React.useState<DatasetUI[]>([]);

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  React.useEffect(() => {
    if (!data) return;
    setAllDatasets(
      data.chart.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: getRandomColor(dataset.label),
        enabled: true,
      }))
    );
  }, [data, setAllDatasets]);

  if (loading) return <CircularProgress />;
  if (!data) return <></>;

  const { labels, title } = data.chart;
  const datasets = allDatasets.filter((dataset) => dataset.enabled);
  return (
    <div className={classes.root}>
      <Typography variant="h5">{title}</Typography>
      <IconButton onClick={() => history.push(`/chart/${id}`)}>
        <Icon>edit</Icon>
      </IconButton>
      <div className={classes.layout}>
        <div className={classes.chart}>
          <Radar
            width={500}
            height={500}
            data={{ labels, datasets }}
            legend={{ display: false }}
            options={{
              tooltips: {
                enabled: false,
              },
              elements: {
                point: {
                  radius: 0,
                  hoverRadius: 0,
                },
              },
              scale: {
                ticks: {
                  display: false,
                },
              },
            }}
          />
        </div>
        <ChartDatasets datasets={allDatasets} onChange={setAllDatasets} onDelete={refetch} />
      </div>
    </div>
  );
};

export { ChartDisplay };
