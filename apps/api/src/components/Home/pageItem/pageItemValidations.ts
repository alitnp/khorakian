import { existsStringValidation } from "@/validation/globalValidations";
import {
  isNumberInBody,
  paramIdValidations,
} from "@/validation/globalValidations";

export const getPageItemValidations = [...paramIdValidations];
export const createPageItemValidations = [
  ...existsStringValidation({
    key: "type",
    name: "شناسه نوع المان",
    minLength: 24,
    maxLength: 24,
  }),
  ...existsStringValidation({
    key: "sorting",
    name: "شناسه ترتیب المان",
    minLength: 24,
    maxLength: 24,
  }),
  ...existsStringValidation({
    key: "style",
    name: "شناسه ظاهر المان",
    minLength: 24,
    maxLength: 24,
  }),
  ...isNumberInBody("index", "ترتیب"),
];

export const updatePageItemValidations = [
  ...paramIdValidations,
  ...existsStringValidation({
    key: "type",
    name: "شناسه نوع المان",
    minLength: 24,
    maxLength: 24,
  }),
  ...existsStringValidation({
    key: "sorting",
    name: "شناسه ترتیب المان",
    minLength: 24,
    maxLength: 24,
  }),
  ...existsStringValidation({
    key: "style",
    name: "شناسه ظاهر المان",
    minLength: 24,
    maxLength: 24,
  }),
  ...isNumberInBody("index", "ترتیب"),
];

export const deletePageItemValidations = [...paramIdValidations];
