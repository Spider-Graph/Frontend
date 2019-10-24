import gql from 'graphql-tag';
import { ChangeChartDTO, ChartChangeResponseDTO } from '@models/api';

export interface AddChart {
  addChart: ChartChangeResponseDTO;
}

export interface AddChartVariables {
  chart: ChangeChartDTO;
}

export const ADD_CHART = gql`
  mutation AddChart($chart: ChangeChart!) {
    addChart(chart: $chart) {
      chart {
        id
      }
    }
  }
`;
