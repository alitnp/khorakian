import { ApiDataListResponse } from "@my/types";
import { ObjectId } from "mongoose";
import { getAllData, IData } from "@/data/globalData";
import { NotFoundError } from "@/helpers/error";
import { Author } from "@/components/author/authorModel";
import {
  Book,
  IBook,
  IBookUpdate,
  IBookCreate,
} from "@/components/book/bookModel";
import { Category } from "@/components/category/categoryModel";
import BadRequestError from "@/helpers/error/BadRequestError";

class BookData implements IData<IBook, IBookCreate, IBookUpdate> {
  getAll = async (req: Req): Promise<ApiDataListResponse<IBook>> => {
    const searchQuery: any = {};
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query._id) searchQuery._id = req.query._id;
    if (req.query.authorFullName)
      searchQuery["authors.fullName"] = {
        $regex: req.query.authorFullName,
        $options: "i",
      };
    if (req.query.authorId) searchQuery["authors._id"] = req.query.authorId;
    if (req.query.categoryTitle)
      searchQuery["category.title"] = {
        $regex: req.query.categoryTitle,
        $options: "i",
      };
    if (req.query.categoryId)
      searchQuery["category._id"] = req.query.categoryId;
    return getAllData<IBook>(searchQuery, req, Book);
  };

  get = async (id: string): Promise<IBook> => {
    const book = await Book.findById(id);
    if (!book) throw new NotFoundError();

    return book;
  };

  create = async ({
    title,
    authorsIds,
    categoryId,
  }: IBookCreate): Promise<IBook> => {
    const category = await Category.findById(categoryId);
    if (!category)
      throw new BadRequestError("دسته بندی با این شناسه یافت نشد.");

    await this.checkIfAuthorsExist(authorsIds);
    const authors = await Author.find({ _id: { $in: authorsIds } });

    const book = new Book({
      title,
      authors,
      category,
    });
    return await book.save();
  };

  update = async ({
    id,
    title,
    authorsIds,
    categoryId,
  }: IBookUpdate): Promise<IBook> => {
    const book = await Book.findById(id);
    if (!book) throw new NotFoundError();

    book.title = title;

    const category = await Category.findById(categoryId);
    if (!category)
      throw new BadRequestError("دسته بندی با این شناسه یافت نشد.");

    await this.checkIfAuthorsExist(authorsIds);
    const authors = await Author.find({ _id: { $in: authorsIds } });
    book.category = category;
    book.authors = authors;

    return await book.save();
  };

  remove = async (id: string): Promise<IBook> => {
    const book = await Book.findByIdAndDelete(id);
    if (!book) throw new NotFoundError();

    return book;
  };

  checkIfAuthorsExist = async (authorsIds: ObjectId[]): Promise<void> => {
    for (let i = 0; i < authorsIds.length; i++) {
      const id = authorsIds[i];
      const existingAuthor = await Author.findById(id);
      if (!existingAuthor)
        throw new BadRequestError("نویسنده ای با شناسه ارسالی یافت نشد.");
    }
  };
}

export default BookData;
