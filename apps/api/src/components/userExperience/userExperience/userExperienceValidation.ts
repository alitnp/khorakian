import {
  bodyIdValidations,
  paramIdValidations,
  shortTitleValidations,
} from "@/validation/globalValidations";

export const getUserExperienceValidations = [...paramIdValidations];
export const createUserExperienceValidations = [
  ...bodyIdValidations("userExperienceCategory"),
  ...shortTitleValidations,
];

export const updateUserExperienceValidations = [
  ...paramIdValidations,
  ...shortTitleValidations,
];

export const deleteUserExperienceValidations = [...paramIdValidations];
