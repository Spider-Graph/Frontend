// tslint:disable: max-classes-per-file
import { IsArray, IsBoolean, IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';

export class ChartDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  labels: string[];

  @IsArray()
  datasets: DatasetDTO[];
}

export class DatasetDTO {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsArray()
  data: number[];

  @IsNotEmptyObject()
  chart: ChartDTO;
}

export class ChangeChartDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  labels: string[];
}

export class ChangeDatasetDTO {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsArray()
  data: number[];
}

export class ChartChangeResponseDTO {
  @IsNotEmptyObject()
  chart: ChartDTO;

  @IsArray()
  charts: ChartDTO[];

  @IsBoolean()
  completed: boolean;
}

export class DatasetChangeResponseDTO {
  @IsNotEmptyObject()
  dataset: DatasetDTO;

  @IsArray()
  datasets: DatasetDTO[];

  @IsBoolean()
  completed: boolean;
}
