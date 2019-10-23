import gql from 'graphql-tag';
import { ChangeChartDTO, ChartChangeResponseDTO } from '@models/api';

export interface UpdateChart {
  updateChart: ChartChangeResponseDTO;
}

export interface UpdateChartVariables {
  id: string;
  chart: ChangeChartDTO;
}

export const UPDATE_CHART = gql`
  mutation updateChart($id: String!, $chart: ChangeChart!) {
    updateChart(id: $id, chart: $chart) {
      completed
    }
  }
`;
