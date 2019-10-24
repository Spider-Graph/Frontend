import { ChartColor } from 'chart.js';

import { DatasetDTO } from '@models/api';

export interface DatasetUI extends DatasetDTO {
  backgroundColor: ChartColor;
  enabled: boolean;
}
