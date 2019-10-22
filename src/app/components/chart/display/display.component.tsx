import React from 'react';
import { useQuery } from 'react-apollo';
import { Radar } from 'react-chartjs-2';

import { Typography, makeStyles } from '@material-ui/core';

import { Chart, ChartVariables, CHART } from '@graphql/queries';
import { getRandomColor } from '@utils/randomColorMaker';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(3),
  },
  chart: {
    width: '100%',
    maxWidth: '600px',
  },
  layout: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
  },
}));

interface ChartDisplayProps {
  id: string;
}

const ChartDisplay: React.FunctionComponent<ChartDisplayProps> = ({ id }) => {
  const classes = useStyles({});

  const query = useQuery<Chart, ChartVariables>(CHART, { variables: { id } });
  if (query.loading || !query.data) return <> </>;
  const { labels, title } = query.data.chart;
  console.log(query);

  const allDatasets = query.data.chart.datasets.map(dataset => ({
    ...dataset,
    backgroundColor: getRandomColor(dataset.label),
    enabled: true,
  }));
  const datasets = allDatasets.filter(dataset => dataset.enabled);
  return (
    <div className={classes.root}>
      <Typography variant="h5">{title}</Typography>
      <div className={classes.layout}>
        <div className={classes.chart}>
          <Radar
            width={500}
            height={400}
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
        <div></div>
      </div>
    </div>
  );
};

export { ChartDisplay };
