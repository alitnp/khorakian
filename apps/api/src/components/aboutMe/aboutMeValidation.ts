import {
  existsStringValidation,
  // bodyIdValidations,
  paramIdValidations,
} from "@/validation/globalValidations";

export const getAboutMeValidations = [...paramIdValidations];
export const createAboutMeValidations = [
  ...existsStringValidation({
    key: "postId",
    name: "شناسه پست",
    minLength: 24,
    maxLength: 24,
  }),
  ...existsStringValidation({
    key: "name",
    name: "نام فرد",
    minLength: 2,
    maxLength: 255,
  }),
  ...existsStringValidation({
    key: "position",
    name: "سمت",
    minLength: 2,
    maxLength: 255,
  }),
  ...existsStringValidation({
    key: "text",
    name: "متن",
    minLength: 2,
    maxLength: 255,
  }),
];

export const deleteAboutMeValidations = [...paramIdValidations];
