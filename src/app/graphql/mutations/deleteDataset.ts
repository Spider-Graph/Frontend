import gql from 'graphql-tag';
import { DatasetChangeResponseDTO } from '@models/api';

export interface DeleteDataset {
  deleteDataset: DatasetChangeResponseDTO;
}

export interface DeleteDatasetVariables {
  chart: string;
  id: string;
}

export const DELETE_DATASET = gql`
  mutation AddDataset($chart: String!, $id: String!) {
    deleteDataset(chart: $chart, id: $id) {
      dataset {
        id
      }
      completed
    }
  }
`;
