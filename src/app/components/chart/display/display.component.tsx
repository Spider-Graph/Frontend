import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { Radar } from 'react-chartjs-2';

import { CircularProgress, Fade, Icon, IconButton, Typography, makeStyles } from '@material-ui/core';

import { DatasetUI } from '@models/DatasetUI';
import { useUndux } from '@hooks/useUndux';
import { getRandomColor } from '@utils/randomColorMaker';
import { Chart, ChartVariables, CHART } from '@graphql/queries';
import { ChartDatasets } from '@components/chart/datasets/datasets.component';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'scroll',
    [theme.breakpoints.up('md')]: {
      height: `calc(100vh - ${theme.spacing(8)}px)`,
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
    width: '100%',
    maxWidth: '500px',
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
    },
  },
  layout: {
    width: '100%',
    marginBottom: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      height: 'calc(100% - 128px)',
    },
  },
}));

interface ChartDisplayProps {
  id: string;
}

const ChartDisplay: React.FunctionComponent<ChartDisplayProps> = ({ id }) => {
  const classes = useStyles({});
  const history = useHistory();

  const chart = useQuery<Chart, ChartVariables>(CHART, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only',
  });

  const [, setError] = useUndux('error');
  const [allDatasets, setAllDatasets] = React.useState<DatasetUI[]>([]);

  React.useEffect(() => {
    if (!chart.data) return;
    setAllDatasets(
      chart.data.chart.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: getRandomColor(dataset.label),
        enabled: true,
      }))
    );
  }, [chart.data, setAllDatasets]);

  React.useEffect(() => {
    if (chart.error) {
      setError(chart.error.message);
      chart.error = undefined;
    }
  }, [chart, setError]);

  const { labels, title } = chart.data ? chart.data.chart : { title: '', labels: [] };
  const datasets = allDatasets.filter((dataset) => dataset.enabled);

  return (
    <div className={classes.root}>
      <Fade in={chart.loading}>
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      </Fade>

      <Fade in={!!chart.data}>
        <div className={classes.content}>
          <header className={classes.header}>
            <Typography className={classes.title} variant="h5">
              {title}
            </Typography>
            <IconButton onClick={() => history.push(`/chart/${id}`)}>
              <Icon>edit</Icon>
            </IconButton>
          </header>
          <div className={classes.layout}>
            <div id="chartjs" className={classes.chart}>
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
