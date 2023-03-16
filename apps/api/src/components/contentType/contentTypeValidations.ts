import {
  paramIdValidations,
  titleValidations,
} from "@/validation/globalValidations";

export const createContentTypeValidations = [...titleValidations];

export const updateContentTypeValidations = [
  ...paramIdValidations,
  ...titleValidations,
];

export const deleteContentTypeValidations = [...paramIdValidations];
