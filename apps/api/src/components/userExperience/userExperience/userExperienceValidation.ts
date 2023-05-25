import {
  bodyIdValidations,
  existsStringValidation,
  paramIdValidations,
  titleValidations,
} from "@/validation/globalValidations";

export const getUserExperienceValidations = [...paramIdValidations];
export const createUserExperienceValidations = [
  ...bodyIdValidations("experienceCategory"),
  ...titleValidations,
  ...existsStringValidation({ key: "text", name: "شرح" }),
];

export const updateUserExperienceValidations = [
  ...paramIdValidations,
  ...createUserExperienceValidations,
];

export const deleteUserExperienceValidations = [...paramIdValidations];
