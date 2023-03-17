import { OK } from "http-status/lib";
import { ApiDataListResponse, ApiDataResponse } from "@my/types";

export const apiDataResponse = <T>(
  data: T,
  message?: string,
): ApiDataResponse<T> => {
  return {
    status: OK,
    message: message || "عملیات موفقیت آمیز",
    data,
    isSuccess: true,
  };
};

export const apiDataListResponse = <T>({
  data,
  pageNumber = 1,
  pageSize = 10,
  totalItems = 10,
  totalPages = 1,
  message,
  sortBy,
  desc,
}: Omit<ApiDataListResponse<T>, "isSuccess">): ApiDataListResponse<T> => {
  return {
    status: OK,
    message: message || "عملیات موفقیت آمیز",
    data,
    pageNumber,
    pageSize,
    totalItems,
    totalPages,
    isSuccess: true,
    sortBy,
    desc,
  };
};
