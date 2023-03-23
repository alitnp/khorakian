import {
  paramIdValidations,
  shortTitleValidations,
} from "@/validation/globalValidations";

export const getPostValidations = [...paramIdValidations];
export const createPostValidations = [...shortTitleValidations];

export const updatePostValidations = [
  ...paramIdValidations,
  ...shortTitleValidations,
];

export const deletePostValidations = [...paramIdValidations];
