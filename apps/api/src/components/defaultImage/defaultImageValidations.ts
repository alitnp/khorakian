import {
  existsStringValidation,
  paramValidations,
} from "@/validation/globalValidations";
import { paramIdValidations } from "@/validation/globalValidations";

export const getDefaultImageValidations = [...paramIdValidations];
export const getByKeyDefaultImageValidations = [
  ...paramValidations("key", "شناسه"),
];
export const createDefaultImageValidations = [
  ...existsStringValidation({
    key: "key",
    name: "کلید عکس",
    minLength: 3,
    maxLength: 55,
  }),
  ...existsStringValidation({
    key: "image",
    name: "شناسه عکس",
    minLength: 24,
    maxLength: 24,
  }),
  ...existsStringValidation({
    key: "persianKey",
    name: "عنوان فارسی",
    minLength: 24,
    maxLength: 24,
  }),
];

export const updateDefaultImageValidations = [
  ...paramIdValidations,
  ...createDefaultImageValidations,
];

export const deleteDefaultImageValidations = [...paramIdValidations];
