import {
  bodyIdValidations,
  paramIdValidations,
  shortTitleValidations,
} from "@/validation/globalValidations";

export const getIdeaValidations = [...paramIdValidations];
export const createIdeaValidations = [
  ...bodyIdValidations("ideaCategory"),
  ...shortTitleValidations,
];

export const updateIdeaValidations = [
  ...paramIdValidations,
  ...shortTitleValidations,
];

export const deleteIdeaValidations = [...paramIdValidations];
