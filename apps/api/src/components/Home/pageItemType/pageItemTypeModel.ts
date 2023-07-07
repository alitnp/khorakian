import { IPageItemType } from "@my/types";
import { model, Schema } from "mongoose";
import { defaultSchemaProps } from "@/utils/constants";

export const pageItemTypePersianName = "نوع المان صفحه";

export const pageItemTypeSchema = new Schema<IPageItemType>({
  title: {
    type: String,
    required: [true, "عنوان تعیین نشده."],
    minlength: [2, "عنوان حداقل باید ۲ کاراکتر باشد."],
    maxlength: [50, "عنوان حداکثر ۵۰ کاراکتر."],
  },
  persianTitle: { type: String },
  ...defaultSchemaProps,
});

export const PageItemType = model<IPageItemType>(
  "PageItemType",
  pageItemTypeSchema
);
