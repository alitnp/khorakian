import {
  // bodyIdValidations,
  paramIdValidations,
  shortTitleValidations,
} from "@/validation/globalValidations";

export const getAboutMeValidations = [...paramIdValidations];
export const createAboutMeValidations = [
  // ...bodyIdValidations("post"),
  ...shortTitleValidations,
];

export const updateAboutMeValidations = [
  ...paramIdValidations,
  ...shortTitleValidations,
];

export const deleteAboutMeValidations = [...paramIdValidations];
