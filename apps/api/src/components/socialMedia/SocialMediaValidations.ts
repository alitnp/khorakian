import {
  paramIdValidations,
  shortTitleValidations,
} from "@/validation/globalValidations";

export const getSocialMediaValidations = [...paramIdValidations];
export const createSocialMediaValidations = [...shortTitleValidations];

export const updateSocialMediaValidations = [
  ...paramIdValidations,
  ...shortTitleValidations,
];

export const deleteSocialMediaValidations = [...paramIdValidations];
