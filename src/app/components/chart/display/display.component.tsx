import React from 'react';
import { useQuery } from 'react-apollo';
import { Radar } from 'react-chartjs-2';

import { CircularProgress, Fade, makeStyles } from '@material-ui/core';

import { DatasetUI } from '@models/DatasetUI';
import { useUndux } from '@hooks/useUndux';
import { getRandomColor } from '@utils/randomColorMaker';
import { Chart, ChartVariables, CHART } from '@graphql/queries';

import { ChartDatasets } from '@components/chart/datasets/datasets.component';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      height: `calc(100vh - ${theme.spacing(10)}px)`,
    },
  },
  loading: {
    position: 'absolute',
  },
  content: {
    height: '100%',
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  title: {
    padding: theme.spacing(1),
  },
  chart: {
    width: `calc(100vw - ${theme.spacing(2)}px)`,
    maxWidth: 500,
  },
  layout: {
    width: '100%',
    display: 'grid',
    gridGap: theme.spacing(2),
    gridTemplateColumns: '1fr',
    justifyItems: 'center',
    [theme.breakpoints.up('md')]: {
      height: `calc(100vh - ${theme.spacing(12)}px)`,
      gridAutoRows: 'unset',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
    },
  },
}));

interface ChartDisplayProps {
  id: string;
}

const ChartDisplay: React.FunctionComponent<ChartDisplayProps> = ({ id }) => {
  const classes = useStyles({});

  const chart = useQuery<Chart, ChartVariables>(CHART, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'no-cache',
  });

  const [, setTitle] = useUndux('title');
  const [, setError] = useUndux('error');
  const [allDatasets, setAllDatasets] = React.useState<DatasetUI[]>([]);

  React.useEffect(() => {
    if (!chart.data) return;
    setTitle(chart.data.chart.title);
  }, [chart.data, setTitle]);

  React.useEffect(() => {
    if (!chart.data) return;
    setAllDatasets(
      chart.data.chart.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: getRandomColor(dataset.label),
        enabled: true,
        deleting: false,
      }))
    );
  }, [chart.data, setAllDatasets]);

  React.useEffect(() => {
    if (chart.error) {
      setError(chart.error.message);
      chart.error = undefined;
    }
  }, [chart, setError]);

  const { labels } = chart.data ? chart.data.chart : { labels: [] };
  const datasets = allDatasets.filter((dataset) => dataset.enabled);

  return (
    <div className={classes.root}>
      <Fade in={chart.loading}>
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      </Fade>

      <Fade in={!!datasets && !chart.loading}>
        <div className={classes.content}>
          <div className={classes.layout}>
            <div id="chartjs" className={classes.chart}>
              <Radar
                width={480}
                height={480}
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
                  // scale: {
                  //   ticks: {
                  //     display: false,
                  //   },
                  // },
                }}
              />
            </div>

            <ChartDatasets datasets={allDatasets} onChange={setAllDatasets} onDelete={chart.refetch} />
          </div>
        </div>
      </Fade>
    </div>
  );
};

export { ChartDisplay };
