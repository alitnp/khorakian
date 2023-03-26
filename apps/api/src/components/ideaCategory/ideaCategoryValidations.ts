import {
  paramIdValidations,
  shortTitleValidations,
} from "@/validation/globalValidations";

export const getIdeaCategoryValidations = [...paramIdValidations];
export const createIdeaCategoryValidations = [...shortTitleValidations];

export const updateIdeaCategoryValidations = [
  ...paramIdValidations,
  ...shortTitleValidations,
];

export const deleteIdeaCategoryValidations = [...paramIdValidations];
