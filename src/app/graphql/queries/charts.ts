import gql from 'graphql-tag';

import { ChartDTO } from '@models/api';

export interface Charts {
  charts: ChartDTO[];
}

export const CHARTS = gql`
  {
    charts {
      id
      title
    }
  }
`;
