import {
  fullNameValidations,
  mobileNumberValidations,
  paramIdValidations,
  passwordValidations,
} from "@/validation/globalValidations";

export const loginValidations = [
  ...mobileNumberValidations,
  ...passwordValidations,
];

export const createUserValidations = [
  ...fullNameValidations,
  ...mobileNumberValidations,
  ...passwordValidations,
];

export const updateUserValidations = [
  ...paramIdValidations,
  ...fullNameValidations,
];
