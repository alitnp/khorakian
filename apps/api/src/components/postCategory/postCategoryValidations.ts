import {
  paramIdValidations,
  shortTitleValidations,
} from "@/validation/globalValidations";

export const getPostCategoryValidations = [...paramIdValidations];
export const createPostCategoryValidations = [...shortTitleValidations];

export const updatePostCategoryValidations = [
  ...paramIdValidations,
  ...shortTitleValidations,
];

export const deletePostCategoryValidations = [...paramIdValidations];
