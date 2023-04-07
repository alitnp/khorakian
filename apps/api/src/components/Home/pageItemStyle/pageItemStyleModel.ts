import { IPageItemStyle } from "@my/types";
import { model, Schema } from "mongoose";
import { defaultSchemaProps } from "@/utils/constants";

export const pageItemStylePersianName = "طریقه نمایش المان";

export const pageItemStyleSchema = new Schema<IPageItemStyle>({
  title: {
    type: String,
    required: [true, "عنوان تعیین نشده."],
    minlength: [2, "عنوان حداقل باید ۲ کاراکتر باشد."],
    maxlength: [50, "عنوان حداکثر ۵۰ کاراکتر."],
  },
  ...defaultSchemaProps,
});

export const PageItemStyle = model<IPageItemStyle>(
  "PageItemStyle",
  pageItemStyleSchema,
);
