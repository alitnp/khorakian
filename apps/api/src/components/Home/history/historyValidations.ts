import {
  paramIdValidations,
  shortTitleValidations,
} from "@/validation/globalValidations";

export const getHistoryValidations = [...paramIdValidations];
export const createHistoryValidations = [...shortTitleValidations];

export const updateHistoryValidations = [
  ...paramIdValidations,
  ...shortTitleValidations,
];

export const deleteHistoryValidations = [...paramIdValidations];
