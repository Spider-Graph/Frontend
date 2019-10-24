import { DatasetDTO } from '@models/api';

export interface DatasetUI extends DatasetDTO {
  backgroundColor: string;
  enabled: boolean;
}
