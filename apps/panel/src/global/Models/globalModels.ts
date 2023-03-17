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

export interface backendReponse<T> {
  data: T;
  isSuccess: boolean;
  message: string;
  pageCount: number;
  pageNumber: number;
  pageSize: number;
  statusCode: number;
  totalItemCount: number;
}

export type loginResponse = {
  access_token: string;
  axpires_in: number;
  refreshToken: string;
  token_type: string;
};

export type basicActors = {
  creationDate: string;
  creationTime: string;
  modificationDate: string;
  modificationTime: string;
  modifier: string;
  modifierId: number;
  creator: string;
  creatorId: number;
  isActive: boolean;
};

export type routeModel = {
  title: string;
  englishTitle: string;
  inputs: ReactNode;
  filterInputs: ReactNode;
  columns(_handleDelete: (_id: number) => void): any;
  ListRoute: string;
  createRoute: string;
  editRoute: string;
  detailRoute: string;
  deleteEndpoint: string;
  listEndpoint: string;
  editEndpoint: string;
  detailEndpoint: string;
  createEndpoint: string;
};
