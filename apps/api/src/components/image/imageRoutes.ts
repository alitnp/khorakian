import { Router } from "express";
//@ts-ignore
import multer, { DestinationCallback } from "multer";

import auth from "@/middlewares/athenticate";

const router = Router();
// const upload = multer({ dest: "public/files" });
const multerStorage = multer.diskStorage({
  destination: (_req: Req, _file: any, cb: DestinationCallback) => {
    cb(null, "public");
  },
  filename: (_req: Req, file: any, cb: DestinationCallback) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
// Multer Filter

const multerFilter = (_req: Req, file: any, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not a Image File!!"), false);
  }
};
const upload = multer({
  storage: multerStorage,

  fileFilter: multerFilter,
});

//get
// router.get("/:id", validate(paramIdValidations), postCategoryController.get);

//post
router.post(
  "/upload",
  [auth, upload.single("file")],
  (req: Req & { file: File }) => {
    console.log(req.body.title);
    console.log(req.file);
  },
);

export default router;
