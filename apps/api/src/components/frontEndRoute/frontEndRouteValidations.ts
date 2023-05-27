import {
  existsStringValidation,
  paramIdValidations,
  paramValidations,
} from "@/validation/globalValidations";

export const getFrontEndRouteValidations = [...paramIdValidations];
export const createFrontEndRouteValidations = [
  ...existsStringValidation({
    key: "title",
    name: "عنوان",
    minLength: 2,
    maxLength: 1000,
  }),
  ...existsStringValidation({
    key: "path",
    name: "یو آر ال",
    minLength: 2,
    maxLength: 1000,
  }),
];

export const getByKeyFrontEndRouteValidations = [
  ...paramValidations("key", "شناسه"),
];

export const updateFrontEndRouteValidations = [
  ...paramIdValidations,
  ...createFrontEndRouteValidations,
];

export const deleteFrontEndRouteValidations = [...paramIdValidations];
