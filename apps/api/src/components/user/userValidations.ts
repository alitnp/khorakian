import {
  existsStringValidation,
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

export const changePasswordValidations = [
  ...existsStringValidation({
    key: "currentPassword",
    name: "رمز عبور فعلی",
    minLength: 8,
    maxLength: 255,
  }),
  ...existsStringValidation({
    key: "newPassword",
    name: "رمز عبور جدید",
    minLength: 8,
    maxLength: 255,
  }),
];
