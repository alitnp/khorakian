import { body, param, query, ValidationChain } from "express-validator";
import { isValidObjectId } from "mongoose";

import { englishNumber } from "@/utils/util";

export const englishNumbersSanitization = (key: string) => [
  param(key).customSanitizer((value) => englishNumber(value)),
  body(key).customSanitizer((value) => englishNumber(value)),
  query(key).customSanitizer((value) => englishNumber(value)),
];

export const paramIdValidations = [
  param("id", "شناسه مشخص نشده است.")
    .isString()
    .isLength({ min: 24, max: 24 })
    .custom((value) => {
      if (!isValidObjectId(value))
        return Promise.reject("شناسه به درستی وارد نشده است.");
      else return Promise.resolve();
    }),
];
export const bodyIdValidations = (
  propertyName = "_id",
  persianName = "شناسه",
) => [
  body(propertyName, `${persianName} ارسال نشده`)
    .isString()
    .isLength({ min: 24, max: 24 })
    .custom((value) => {
      if (!isValidObjectId(value))
        return Promise.reject(`${persianName} ارسال نشده`);
      else return Promise.resolve();
    }),
];
export const paramValidations = (paramName = "id", persianName = "شناسه") => [
  param(paramName, `${persianName} ارسال نشده`).exists().isString(),
];

type existsStringValidation = {
  key: string;
  name: string;
  source?: ["body" | "param" | "query"];
  minLength?: number;
  maxLength?: number;
};
export const existsStringValidation = ({
  key,
  name,

  source = ["body"],
  minLength,
  maxLength,
}: existsStringValidation): ValidationChain[] => {
  const validations: ValidationChain[] = [];

  if (minLength) {
    if (source.includes("body"))
      validations.push(
        body(key, `${name} باید حداقل ${minLength} کاراکتر باشد.`).isLength({
          min: minLength,
        }),
      );
    if (source.includes("param"))
      validations.push(
        param(key, `${name} باید حداقل ${minLength} کاراکتر باشد.`).isLength({
          min: minLength,
        }),
      );
    if (source.includes("query"))
      validations.push(
        query(key, `${name} باید حداقل ${minLength} کاراکتر باشد.`).isLength({
          min: minLength,
        }),
      );
  }
  if (maxLength) {
    if (source.includes("body"))
      validations.push(
        body(key, `${name} باید حداکثر ${maxLength} کاراکتر باشد.`).isLength({
          max: maxLength,
        }),
      );
    if (source.includes("param"))
      validations.push(
        param(key, `${name} باید حداکثر ${maxLength} کاراکتر باشد.`).isLength({
          max: maxLength,
        }),
      );
    if (source.includes("query"))
      validations.push(
        query(key, `${name} باید حداکثر ${maxLength} کاراکتر باشد.`).isLength({
          max: maxLength,
        }),
      );
  }

  if (key && name) {
    if (source.includes("body"))
      validations.push(
        body(key, `${name} ارسال نشده است.`)
          .exists({ checkFalsy: true })
          .isString(),
      );
    if (source.includes("param"))
      validations.push(
        param(key, `${name} ارسال نشده است.`)
          .exists({ checkFalsy: true })
          .isString(),
      );
    if (source.includes("query"))
      validations.push(
        query(key, `${name} ارسال نشده است.`)
          .exists({ checkFalsy: true })
          .isString(),
      );
  }

  return validations;
};

export const isNumberInBody = (name: string, persianName: string) => [
  ...englishNumbersSanitization(name),
  body(name, `${persianName} ارسال نشده است.`)
    .isNumeric()
    .withMessage(`فقط اعداد برای ${persianName} قابل قبول است.`),
];

export const mobileNumberValidations = [
  ...englishNumbersSanitization("mobileNumber"),
  body("mobileNumber", "شماره همراه ۱۱ رقم، مثال: ۰۹۱۲۳۴۵۶۷۸۹")
    .isLength({ min: 11, max: 11 })
    .matches(/[0-9۰-۹]/),
  ...existsStringValidation({ key: "mobileNumber", name: "شماره همراه" }),
];

export const passwordValidations = [
  ...existsStringValidation({
    key: "password",
    name: "رمز عبور",
    minLength: 8,
    maxLength: 255,
  }),
];

export const firstNameValidations = [
  ...existsStringValidation({
    key: "firstName",
    name: "نام",
    minLength: 2,
    maxLength: 50,
  }),
];

export const fullNameValidations = [
  ...existsStringValidation({
    key: "fullName",
    name: "نام ونام خانوادگی",
    minLength: 2,
    maxLength: 50,
  }),
];

export const lastNameValidations = [
  ...existsStringValidation({
    key: "lastName",
    name: "نام خوانوادگی",
    minLength: 2,
    maxLength: 50,
  }),
];

export const titleValidations = [
  ...existsStringValidation({
    key: "title",
    name: "عنوان",
    minLength: 2,
    maxLength: 255,
  }),
];
export const shortTitleValidations = [
  ...existsStringValidation({
    key: "title",
    name: "عنوان",
    minLength: 2,
    maxLength: 50,
  }),
];
