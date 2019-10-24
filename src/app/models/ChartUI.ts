import { ChartDTO } from '@models/api';

export interface ChartUI extends ChartDTO {
  deleting: boolean;
}
