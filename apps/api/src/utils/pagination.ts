import { getPropertyFromRequest, stringToBoolean } from "@/utils/util";

export const getPageNumber = (req: Req): number => {
  const pageNumber = getPropertyFromRequest(req, "pageNumber");

  if (!pageNumber || pageNumber === "0") return 1;

  try {
    return parseInt(pageNumber as string) || 1;
  } catch {
    return 1;
  }
};

export const getPageSize = (req: Req): number => {
  const pageSize = getPropertyFromRequest(req, "pageSize");

  if (!pageSize || pageSize === "0") return 10;

  try {
    const intPageSize = parseInt(pageSize as string) || 10;
    return intPageSize > 50 ? 50 : intPageSize;
  } catch {
    return 10;
  }
};

export const getSortBy = (req: Req): string | undefined => {
  const sortBy =
    getPropertyFromRequest(req, "sort") ||
    getPropertyFromRequest(req, "sortBy");

  if (!sortBy || typeof sortBy === "number") return undefined;
  return sortBy;
};

export const getSortByDescending = (req: Req): 1 | -1 => {
  const desc = getPropertyFromRequest(req, "desc");
  if (desc === 1 || desc === -1) return desc;
  const booleanDesc = stringToBoolean(desc);
  return booleanDesc ? -1 : 1;
};
