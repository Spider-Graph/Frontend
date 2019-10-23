import gql from 'graphql-tag';
import { ChangeDatasetDTO, DatasetChangeResponseDTO } from '@models/api';

export interface AddDataset {
  addDataset: DatasetChangeResponseDTO;
}

export interface AddDatasetVariables {
  chart: string;
  dataset: ChangeDatasetDTO;
}

export const ADD_DATASET = gql`
  mutation AddDataset($chart: String!, $dataset: ChangeDataset!) {
    addDataset(chart: $chart, dataset: $dataset) {
      completed
    }
  }
`;
