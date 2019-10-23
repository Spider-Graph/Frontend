import gql from 'graphql-tag';

import { ChartDTO } from '@models/api';

export interface ChartData {
  chart: ChartDTO;
}

export interface ChartDataVariables {
  id: string;
}

export const CHART_DATA = gql`
  query Dataset($id: String!) {
    chart(id: $id) {
      title
      labels
    }
  }
`;
