import { IExperienceCategory } from "@my/types";
import { model, Schema } from "mongoose";
import { defaultSchemaProps } from "@/utils/constants";

export const experienceCategorySchema = new Schema<IExperienceCategory>({
  title: {
    type: String,
    required: [true, "عنوان تعیین نشده."],
    minlength: [2, "عنوان حداقل باید ۲ کاراکتر باشد."],
    maxlength: [50, "عنوان حداکثر ۵۰ کاراکتر."],
  },
  ...defaultSchemaProps,
});

export const ExperienceCategory = model<IExperienceCategory>(
  "ExperienceCategory",
  experienceCategorySchema
);
