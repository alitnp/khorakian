import {
  paramIdValidations,
  shortTitleValidations,
} from "@/validation/globalValidations";

export const getExperienceCategoryValidations = [...paramIdValidations];
export const createExperienceCategoryValidations = [...shortTitleValidations];

export const updateExperienceCategoryValidations = [
  ...paramIdValidations,
  ...shortTitleValidations,
];

export const deleteExperienceCategoryValidations = [...paramIdValidations];
