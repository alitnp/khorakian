import { Router } from "express";
//@ts-ignore
import multer from "multer";
import { validate } from "@/helpers";
import { createPostCategoryValidations } from "@/components/postCategory/postCategoryValidations";
import auth from "@/middlewares/athenticate";

const router = Router();
const upload = multer({ dest: "public/files" });

//get
// router.get("/:id", validate(paramIdValidations), postCategoryController.get);

//post
router.post(
  "/upload",
  [auth, ...validate(createPostCategoryValidations), upload.single("file")],
  (req: Req & { file: File }) => {
    console.log(req.file);
  },
);

export default router;
