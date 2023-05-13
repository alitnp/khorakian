import {
  bodyIdValidations,
  paramIdValidations,
  shortTitleValidations,
} from "@/validation/globalValidations";

export const getExperienceValidations = [...paramIdValidations];
export const createExperienceValidations = [
  ...bodyIdValidations("experienceCategory"),
  ...shortTitleValidations,
];

export const updateExperienceValidations = [
  ...paramIdValidations,
  ...shortTitleValidations,
];

export const deleteExperienceValidations = [...paramIdValidations];
