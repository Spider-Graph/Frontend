import gql from 'graphql-tag';

import { ChartDTO, DatasetDTO } from '@models/api';

export interface ChartLabels {
  chart: ChartDTO;
}

export interface Dataset {
  dataset: DatasetDTO;
}

export interface ChartLabelsVariables {
  id: string;
}

export interface DatasetVariables {
  chart: string;
  id: string;
}

export const CHART_LABELS = gql`
  query Dataset($id: String!) {
    chart(id: $id) {
      labels
    }
  }
`;

export const DATASET = gql`
  query Dataset($chart: String!, $id: String!) {
    dataset(chart: $chart, id: $id) {
      label
      data
    }
  }
`;
