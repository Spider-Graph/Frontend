import gql from 'graphql-tag';
import { DatasetChangeResponseDTO } from '@models/api';

export interface DeleteDataset {
  addDataset: DatasetChangeResponseDTO;
}

export interface DeleteDatasetVariables {
  chart: string;
  id: string;
}

export const DELETE_DATASET = gql`
  mutation AddDataset($chart: String!, $id: String!) {
    deleteDataset(chart: $chart, id: $id) {
      completed
    }
  }
`;
