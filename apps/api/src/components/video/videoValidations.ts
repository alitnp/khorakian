import {
  paramIdValidations,
  paramValidations,
  titleValidations,
} from "@/validation/globalValidations";

export const getVideoValidations = [...paramIdValidations];
export const playVideoValidations = [...paramValidations("filename")];

export const createVideoValidations = [];

export const updateVideoValidations = [
  ...paramIdValidations,
  ...titleValidations,
];

export const deleteVideoValidations = [...paramIdValidations];
