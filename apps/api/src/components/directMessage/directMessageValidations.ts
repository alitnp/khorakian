import {
  existsStringValidation,
  paramIdValidations,
  shortTitleValidations,
} from "@/validation/globalValidations";

export const getDirectMessageValidations = [...paramIdValidations];
export const createDirectMessageValidations = [
  ...existsStringValidation({
    key: "text",
    name: "عنوان",
    minLength: 2,
    maxLength: 1000,
  }),
];

export const updateDirectMessageValidations = [
  ...paramIdValidations,
  ...shortTitleValidations,
];

export const deleteDirectMessageValidations = [...paramIdValidations];
