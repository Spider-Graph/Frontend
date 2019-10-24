import gql from 'graphql-tag';
import { ChartChangeResponseDTO } from '@models/api';

export interface DeleteChart {
  deleteChart: ChartChangeResponseDTO;
}

export interface DeleteChartVariables {
  id: string;
}

export const DELETE_CHART = gql`
  mutation AddChart($id: String!) {
    deleteChart(id: $id) {
      chart {
        id
      }
      completed
    }
  }
`;
