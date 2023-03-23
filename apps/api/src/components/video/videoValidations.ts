import {
  paramIdValidations,
  paramValidations,
} from "@/validation/globalValidations";

export const getVideoValidations = [...paramValidations("filename")];

export const updateVideoValidations = [...paramIdValidations];

export const deleteVideoValidations = [...paramIdValidations];
