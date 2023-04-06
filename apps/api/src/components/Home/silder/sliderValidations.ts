import {
  isNumberInBody,
  paramIdValidations,
} from "@/validation/globalValidations";

export const getSliderValidations = [...paramIdValidations];
export const createSliderValidations = [...isNumberInBody("index", "ترتیب")];

export const updateSliderValidations = [
  ...paramIdValidations,
  ...isNumberInBody("index", "ترتیب"),
];

export const deleteSliderValidations = [...paramIdValidations];
