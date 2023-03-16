import { Router } from "express";

import { validate } from "@/helpers";
import { paramIdValidations } from "@/validation/globalValidations";
import isAdmin from "@/middlewares/isAdmin";
import {
  createAuthorValidations,
  updateAuthorValidations,
} from "@/components/author/authorValidations";
import AuthorController from "@/components/author/authorController";
import AuthorData from "@/components/author/authorData";

const router = Router();
const authorData = new AuthorData();
const authorController = new AuthorController(authorData);

//get
router.get("/", authorController.getAll);
router.get("/:id", validate(paramIdValidations), authorController.get);

//post
router.post(
  "/",
  [isAdmin, ...validate(createAuthorValidations)],
  authorController.create,
);

//put
router.put(
  "/:id",
  [isAdmin, ...validate(updateAuthorValidations)],
  authorController.update,
);

//delete
router.delete(
  "/:id",
  [isAdmin, ...validate(paramIdValidations)],
  authorController.remove,
);

export default router;
