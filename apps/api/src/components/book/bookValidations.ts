import { body } from "express-validator";
import { isValidObjectId } from "mongoose";

import { paramIdValidations } from "@/validation/globalValidations";

export const createBookValidations = [
  body("title", "نام کتاب اجباری است.").isString().isLength({ min: 1 }),
  body("categoryId", "دسته بتدی تعیین نشده است.")
    .isString()
    .isLength({ min: 24, max: 24 })
    .custom((value) => {
      if (value === undefined) return Promise.reject();
      if (!isValidObjectId(value))
        return Promise.reject("شناسه دسته بندی به درستی وارد نشده است.");
      else return Promise.resolve();
    }),
  body("authorsIds", "مولف کتاب تعیین نشده است.").custom((value: string[]) => {
    if (value === undefined) return Promise.reject();
    if (value.some((authorId) => !isValidObjectId(authorId)))
      return Promise.reject("شناسه نویسنده به درستی وارد نشده است.");
    else return Promise.resolve();
  }),
];

export const updateBookValidations = [
  ...paramIdValidations,
  ...createBookValidations,
];
