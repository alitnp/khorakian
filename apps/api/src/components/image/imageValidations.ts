import {
  paramIdValidations,
  titleValidations,
} from "@/validation/globalValidations";

export const getImageValidations = [...paramIdValidations];
export const createImageValidations = [];

export const updateImageValidations = [
  ...paramIdValidations,
  ...titleValidations,
];

export const deleteImageValidations = [...paramIdValidations];
