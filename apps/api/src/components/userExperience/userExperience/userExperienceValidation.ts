import {
  bodyIdValidations,
  paramIdValidations,
  shortTitleValidations,
} from "@/validation/globalValidations";

export const getUserExperienceValidations = [...paramIdValidations];
export const createUserExperienceValidations = [
  ...bodyIdValidations("experienceCategory"),
  ...shortTitleValidations,
];

export const updateUserExperienceValidations = [
  ...paramIdValidations,
  ...shortTitleValidations,
];

export const deleteUserExperienceValidations = [...paramIdValidations];
