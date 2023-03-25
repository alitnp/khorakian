import {
  paramIdValidations,
  paramValidations,
  titleValidations,
} from "@/validation/globalValidations";

export const getVideoValidations = [...paramValidations("filename")];

export const createVideoValidations = [];

export const updateVideoValidations = [
  ...paramIdValidations,
  ...titleValidations,
];

export const deleteVideoValidations = [...paramIdValidations];
