import { ReactNode } from 'react';

declare module '*.jpg';
export interface ITableColumn {
  title: string;
  dataIndex?: string;
  key?: number | string;
  render?: (text?: any, record?: any, index?: any) => any;
  width?: number;
  [x: string | number | symbol]: unknown;
}

export interface ISelectOptions {
  id?: number;
  title?: string;
}

export type routeModel = {
  title: string;
  englishTitle: string;
  inputs: ReactNode;
  filterInputs: ReactNode;
  columns(_handleDelete: (_id: number | string) => void): any;
  ListRoute: string;
  createRoute: string;
  editRoute: string;
  detailRoute: string;
  deleteEndpoint: (_id: number | string) => string;
  listEndpoint: string;
  editEndpoint: (_id: number | string) => string;
  detailEndpoint: (_id: number | string) => string;
  createEndpoint: string;
};
