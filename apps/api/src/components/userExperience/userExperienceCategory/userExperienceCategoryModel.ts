import { IUserExperienceCategory } from "@my/types";
import { model, Schema } from "mongoose";
import { defaultSchemaProps } from "@/utils/constants";

export const userExperienceCategoryPersianName = "دسته بندی ایده";

export const userExperienceCategorySchema = new Schema<IUserExperienceCategory>(
  {
    title: {
      type: String,
      required: [true, "عنوان تعیین نشده."],
      minlength: [2, "عنوان حداقل باید ۲ کاراکتر باشد."],
      maxlength: [50, "عنوان حداکثر ۵۰ کاراکتر."],
    },
    ...defaultSchemaProps,
  },
);

export const UserExperienceCategory = model<IUserExperienceCategory>(
  "UserExperienceCategory",
  userExperienceCategorySchema,
);
