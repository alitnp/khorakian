import { Model } from "mongoose";
import { ApiDataListResponse } from "@my/types";
import {
  getPageNumber,
  getPageSize,
  getSortBy,
  getSortByDescending,
} from "@/utils/pagination";

export interface IData<Model, CreateModel = {}, UpdateModel = {}> {
  getAll(req: Req): Promise<ApiDataListResponse<Model>>;
  get(_id: string): Promise<Model>;
  create(prop: CreateModel | Model): Promise<Model>;
  update(prop: UpdateModel | Model): Promise<Model>;
  remove(_id: string): Promise<Model>;
  [key: string]: any;
}

export const getAllData = async <T>(
  searchQuery: any,
  req: Req,
  model: Model<T>,
  populate = "",
): Promise<ApiDataListResponse<T>> => {
  let pageNumber = getPageNumber(req);
  const pageSize = getPageSize(req);
  const totalItems = await model.countDocuments(searchQuery);
  const totalPages = totalItems === 0 ? 1 : Math.ceil(totalItems / pageSize);
  if (pageNumber > totalPages) pageNumber = totalPages;
  const sortBy = getSortBy(req) || "";
  const desc = getSortByDescending(req);

  const data = await model
    .find(searchQuery)
    .populate(populate)
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize)
    .sort(sortBy ? { [sortBy]: desc } : { creationDate: -1 });

  return {
    data,
    pageNumber,
    pageSize,
    totalItems,
    totalPages,
    sortBy,
    desc: desc === -1 ? true : false,
  };
};
