import {
  firstNameValidations,
  lastNameValidations,
  paramIdValidations,
} from "@/validation/globalValidations";

export const createAuthorValidations = [
  ...firstNameValidations,
  ...lastNameValidations,
];

export const updateAuthorValidations = [
  ...paramIdValidations,
  ...firstNameValidations,
  ...lastNameValidations,
];
