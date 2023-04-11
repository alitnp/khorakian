import {
  bodyIdValidations,
  paramIdValidations,
  shortTitleValidations,
} from "@/validation/globalValidations";

export const getPostValidations = [...paramIdValidations];
export const createPostValidations = [
  ...bodyIdValidations("postCategory"),
  ...shortTitleValidations,
];

export const updatePostValidations = [
  ...paramIdValidations,
  ...shortTitleValidations,
];

export const deletePostValidations = [...paramIdValidations];
