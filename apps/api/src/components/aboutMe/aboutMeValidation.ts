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
];

export const deleteAboutMeValidations = [...paramIdValidations];
