import {
  paramIdValidations,
  titleValidations,
} from "@/validation/globalValidations";

export const createCategoryValidations = [...titleValidations];

export const updateCategoryValidations = [
  ...paramIdValidations,
  ...titleValidations,
];

export const deleteCategoryValidations = [...paramIdValidations];
