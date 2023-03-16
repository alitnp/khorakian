import { Router } from "express";
import BookController from "@/components/book/bookController";
import { validate } from "@/helpers";
import {
  createBookValidations,
  updateBookValidations,
} from "@/components/book/bookValidations";
import { paramIdValidations } from "@/validation/globalValidations";
import auth from "@/middlewares/athenticate";
import BookData from "@/components/book/bookData";

const router = Router();
const bookData = new BookData();
const bookController = new BookController(bookData);

//get
router.get("/:id", validate(paramIdValidations), bookController.get);
router.get("/", bookController.getAll);

//post
router.post(
  "/",
  [auth, ...validate(createBookValidations)],
  bookController.create,
);

//put
router.put(
  "/:id",
  [auth, ...validate(updateBookValidations)],
  bookController.update,
);

//delete
router.delete(
  "/:id",
  [auth, ...validate(paramIdValidations)],
  bookController.remove,
);

export default router;
