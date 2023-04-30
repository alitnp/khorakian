import {
  existsStringValidation,
  paramIdValidations,
  paramValidations,
} from "@/validation/globalValidations";

export const getDefaultTextValidations = [...paramIdValidations];
export const createDefaultTextValidations = [
  ...existsStringValidation({
    key: "text",
    name: "متن",
    minLength: 2,
    maxLength: 1000,
  }),
];

export const getByKeyDefaultTextValidations = [
  ...paramValidations("key", "شناسه"),
];

export const updateDefaultTextValidations = [
  ...existsStringValidation({
    key: "text",
    name: "متن",
    minLength: 2,
    maxLength: 1000,
  }),
];

export const deleteDefaultTextValidations = [...paramIdValidations];
