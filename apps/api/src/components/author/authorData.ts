import { ApiDataListResponse } from "@my/types";
import { getAllData, IData } from "@/data/globalData";
import { Book } from "@/components/book/bookModel";
import { Author, IAuthor } from "@/components/author/authorModel";
import { ConflictError, NotFoundError } from "@/helpers/error";

class AuthorData implements IData<IAuthor> {
  getAll = async (req: Req): Promise<ApiDataListResponse<IAuthor>> => {
    const searchQuery: any = {};
    if (req.query.fullName)
      searchQuery.fullName = { $regex: req.query.fullName, $options: "i" };
    if (req.query.firstName)
      searchQuery.firstName = { $regex: req.query.firstName, $options: "i" };
    if (req.query.lastName)
      searchQuery.lastName = { $regex: req.query.lastName, $options: "i" };
    if (req.query._id) searchQuery._id = req.query._id;

    return getAllData<IAuthor>(searchQuery, req, Author);
  };

  get = async (id: string): Promise<IAuthor> => {
    const author = await Author.findById(id);
    if (!author) throw new NotFoundError();

    return author;
  };

  create = async ({ firstName, lastName }: IAuthor): Promise<IAuthor> => {
    const author = new Author({
      firstName,
      lastName,
    });
    author.setFullName();
    return await author.save();
  };

  update = async ({ _id, firstName, lastName }: IAuthor): Promise<IAuthor> => {
    const author = await Author.findById(_id);
    if (!author) throw new NotFoundError();

    author.firstName = firstName;
    author.lastName = lastName;
    author.setFullName();

    await Book.updateMany(
      {
        "author._id": _id,
      },
      {
        $set: {
          "author.$": author,
        },
      },
    );

    return await author.save();
  };

  remove = async (id: string): Promise<IAuthor> => {
    const author = await Author.findByIdAndDelete(id);
    if (!author) throw new NotFoundError();

    const booksWithThisAuthor = await Book.find({ "author._id": id });
    if (booksWithThisAuthor.length > 0)
      throw new ConflictError("این نویسنده در جای دیگر درحال استفاده می باشد.");

    return author;
  };
}

export default AuthorData;
