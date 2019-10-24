import gql from 'graphql-tag';
import { ChangeDatasetDTO, DatasetChangeResponseDTO } from '@models/api';

export interface UpdateDataset {
  updateDataset: DatasetChangeResponseDTO;
}

export interface UpdateDatasetVariables {
  id: string;
  chart: string;
  dataset: ChangeDatasetDTO;
}

export const UPDATE_DATASET = gql`
  mutation UpdateDataset($chart: String!, $id: string, $dataset: ChangeDataset!) {
    updateDataset(chart: $chart, id: $id, dataset: $dataset) {
      completed
    }
  }
`;
