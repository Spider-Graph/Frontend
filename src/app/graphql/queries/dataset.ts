import gql from 'graphql-tag';

import { DatasetDTO } from '@models/api';

export interface Dataset {
  dataset: DatasetDTO;
}

export interface DatasetVariables {
  chart: string;
  id: string;
}

export const DATASET = gql`
  query Dataset($chart: String!, $id: String!) {
    dataset(chart: $chart, id: $id) {
      label
      data
    }
  }
`;
