import gql from 'graphql-tag';

import { ChartDTO } from '@models/api';

export interface Chart {
  chart: ChartDTO;
}

export interface ChartVariables {
  id: string;
}

export const CHART = gql`
  query Chart($id: String!) {
    chart(id: $id) {
      title
      labels
      datasets {
        id
        label
        data
      }
    }
  }
`;
