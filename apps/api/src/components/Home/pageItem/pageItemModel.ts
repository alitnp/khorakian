import { IPageItem } from "@my/types";
import { model, Schema } from "mongoose";
import { defaultSchemaProps } from "@/utils/constants";

export const pageItemPersianName = "المان صفحه";

export const pageItemSchema = new Schema<IPageItem>({
  title: {
    type: String,
    required: [true, "عنوان تعیین نشده."],
    minlength: [2, "عنوان حداقل باید ۲ کاراکتر باشد."],
    maxlength: [50, "عنوان حداکثر ۵۰ کاراکتر."],
  },
  subTitle: String,
  type: { type: Schema.Types.ObjectId, ref: "PageItemType" },
  style: { type: Schema.Types.ObjectId, ref: "PageItemStyle" },
  sorting: { type: Schema.Types.ObjectId, ref: "PageItemSorting" },
  index: Number,
  ...defaultSchemaProps,
});

export const PageItem = model<IPageItem>("PageItem", pageItemSchema);
