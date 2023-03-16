import {
  firstNameValidations,
  lastNameValidations,
  mobileNumberValidations,
  paramIdValidations,
  passwordValidations,
} from "@/validation/globalValidations";

export const loginValidations = [
  ...mobileNumberValidations,
  ...passwordValidations,
];

export const createUserValidations = [
  ...firstNameValidations,
  ...lastNameValidations,
  ...mobileNumberValidations,
  ...passwordValidations,
];

export const updateUserValidations = [
  ...paramIdValidations,
  ...firstNameValidations,
  ...lastNameValidations,
];
