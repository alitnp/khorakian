import { ApiDataListResponse } from "@my/types";
import { getAllData, IData } from "@/data/globalData";
import { ConflictError, NotFoundError } from "@/helpers/error";
import {
  ContentType,
  IContentType,
} from "@/components/contentType/contentTypeModel";

class ContentTypeData implements IData<IContentType> {
  getAll = async (req: Req): Promise<ApiDataListResponse<IContentType>> => {
    const searchQuery: any = {};
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query._id) searchQuery._id = req.query._id;

    return getAllData<IContentType>(searchQuery, req, ContentType);
  };

  get = async (id: string): Promise<IContentType> => {
    const contentType = await ContentType.findById(id);
    if (!contentType) throw new NotFoundError();

    return contentType;
  };

  create = async ({ title }: IContentType): Promise<IContentType> => {
    const existingCategory = await ContentType.findOne({ title });
    if (!!existingCategory)
      throw new ConflictError("دسته بندی با این نام قبلا ثبت شده است.");

    const contentType = new ContentType({
      title,
    });
    return await contentType.save();
  };

  update = async ({ _id, title }: IContentType): Promise<IContentType> => {
    const contentType = await ContentType.findById(_id);
    if (!contentType) throw new NotFoundError();

    const existingContentType = await ContentType.findOne({ title });
    if (!!existingContentType) throw new ConflictError();

    contentType.title = title;

    // await Book.updateMany(
    //   {
    //     "category._id": _id,
    //   },
    //   {
    //     $set: {
    //       "category.title": title,
    //     },
    //   },
    // );

    return await contentType.save();
  };

  remove = async (id: string): Promise<IContentType> => {
    const conentType = await ContentType.findById(id);
    if (!conentType) throw new NotFoundError();

    // const booksWithThisCategory = await Book.find({ "category._id": id });
    // if (booksWithThisCategory.length > 0)
    //   throw new ConflictError(
    //     "این دسته بندی در جای دیگر درحال استفاده می باشد.",
    //   );

    await ContentType.findByIdAndDelete(id);

    return conentType;
  };
}

export default ContentTypeData;
