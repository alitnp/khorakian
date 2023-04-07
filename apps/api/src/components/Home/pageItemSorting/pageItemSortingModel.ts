import { IPageItemSorting } from "@my/types";
import { model, Schema } from "mongoose";
import { defaultSchemaProps } from "@/utils/constants";

export const pageItemSortingPersianName = "نوع المان صفحه";

export const pageItemSortingSchema = new Schema<IPageItemSorting>({
  title: {
    type: String,
    required: [true, "عنوان تعیین نشده."],
    minlength: [2, "عنوان حداقل باید ۲ کاراکتر باشد."],
    maxlength: [50, "عنوان حداکثر ۵۰ کاراکتر."],
  },
  ...defaultSchemaProps,
});

export const PageItemSorting = model<IPageItemSorting>(
  "PageItemSorting",
  pageItemSortingSchema,
);
