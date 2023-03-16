import { IBook, IBookUpdate, IBookCreate } from "@/components/book/bookModel";
import BaseController from "@/controller/globalControllers";
import { IData } from "@/data/globalData";

class BookController extends BaseController<IBook, IBookCreate, IBookUpdate> {
  constructor(data: IData<IBook, IBookCreate, IBookUpdate>) {
    super(data);
  }
}

export default BookController;
