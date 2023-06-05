import { Model } from "mongoose";
import { ApiDataListResponse } from "@my/types";
import {
  getPageNumber,
  getPageSize,
  getSortBy,
  getSortByDescending,
} from "@/utils/pagination";
import { ConflictError, NotFoundError } from "@/helpers/error";
import { getUserIsAdminFromReq, stringToBoolean } from "@/utils/util";

export interface IData<Model, CreateModel = {}, UpdateModel = {}> {
  getAll(req: Req): Promise<ApiDataListResponse<Model>>;
  get(_id: string): Promise<Model>;
  create(prop: CreateModel | Model): Promise<Model>;
  update(prop: UpdateModel | Model): Promise<Model>;
  remove(_id: string): Promise<Model>;
  [key: string]: any;
}

export class BasicData<entityModel> implements IData<entityModel> {
  model: Model<entityModel>;
  persianName: string;
  constructor(model: Model<entityModel>, persianName = "") {
    this.model = model;
    this.persianName = persianName;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<entityModel>> => {
    const searchQuery: Record<string, any> = defaultSearchQueries({}, req);
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query._id) searchQuery._id = { $regex: req.query._id };
    return await getAllData<entityModel>(searchQuery, req, this.model);
  };

  get = async (id: string): Promise<entityModel> => {
    const item = await this.model.findById(id);
    if (!item) throw new NotFoundError();
    return item;
  };

  create = async ({ title }: { title: string }): Promise<entityModel> => {
    const existingItem = await this.model.findOne({ title });
    if (!!existingItem)
      throw new ConflictError(
        `یک ${this.persianName} با این نام قبلا ثبت شده.`,
      );
    const item = new this.model({
      title,
    });
    return await item.save();
  };

  update = async ({
    _id,
    title,
  }: {
    _id: string;
    title: string;
  }): Promise<entityModel> => {
    const existingItem = await this.model.findOne({ title });
    console.log("existing Item : ", existingItem);
    if (!!existingItem)
      throw new ConflictError(
        `یک ${this.persianName} با این نام قبلا ثبت شده.`,
      );

    const item = await this.model.findByIdAndUpdate(
      _id,
      { $set: { title } },
      { new: true },
    );
    if (!item) throw new NotFoundError();

    return await item.save();
  };

  remove = async (id: string): Promise<entityModel> => {
    const item = await this.model.findByIdAndRemove(id);
    if (!item) throw new NotFoundError();

    return item;
  };
}

export const getAllData = async <T>(
  searchQuery: any,
  req: Req,
  model: Model<T>,
  populate?: any,
): Promise<ApiDataListResponse<T>> => {
  const {
    fixedSearchQuery,
    pageNumber,
    pageSize,
    totalItems,
    totalPages,
    sortBy,
    desc,
  } = await paginationProps(searchQuery, req, model);

  const data = await model
    .find(fixedSearchQuery)
    .populate(populate || [])
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

export const paginationProps = async <T>(
  searchQuery: any,
  req: Req,
  model: Model<T>,
) => {
  let pageNumber = getPageNumber(req);
  const pageSize = getPageSize(req);
  const totalItems = await model.countDocuments(searchQuery);

  const totalPages = totalItems === 0 ? 1 : Math.ceil(totalItems / pageSize);
  if (pageNumber > totalPages) pageNumber = totalPages;
  const sortBy = getSortBy(req) || "";
  const desc = getSortByDescending(req);

  //if the user is not admin then return only published content
  if (!getUserIsAdminFromReq(req)) searchQuery.isPublished = true;

  return {
    fixedSearchQuery: searchQuery,
    pageNumber,
    pageSize,
    totalItems,
    totalPages,
    sortBy,
    desc,
    descBoolean: desc === -1 ? true : false,
  };
};

export const defaultSearchQueries = (
  searchQuery: Record<string, any>,
  req: Req,
): Record<string, any> => {
  if (req.query._id) searchQuery._id = req.query._id;
  if (req.query.creationDateFrom)
    searchQuery.creationData = { $bt: req.query.creationDateFrom };
  if (req.query.creationDateTo)
    searchQuery.creationData = { $lt: req.query.creationDateFrom };
  if (req.query.isPublished && getUserIsAdminFromReq(req)) {
    searchQuery.isPublished = stringToBoolean(req.query.isPublished);
  }
  if (!getUserIsAdminFromReq(req)) searchQuery.isPublished = true;

  return searchQuery;
};
