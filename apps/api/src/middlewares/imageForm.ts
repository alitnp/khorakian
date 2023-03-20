//@ts-ignore
import multer, { DestinationCallback } from "multer";
import BadRequestError from "@/helpers/error/BadRequestError";
import CONFIG from "@/config";

//multerStorage
const multerStorage = multer.diskStorage({
  destination: (_req: Req, _file: any, cb: DestinationCallback) => {
    cb(null, CONFIG.APP.STATIC_FILES_PATH + "/image");
  },
  // filename: (_req: Req, file: any, cb: DestinationCallback) => {
  //   const ext = file.mimetype.split("/")[1];

  //   cb(null, `image/temp-image-${Date.now()}.${ext}`);
  // },
});
// Multer Filter
const multerFilter = (_req: Req, file: any, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new BadRequestError("فرمت عکس ارسال شده قابل قبول نیست."), false);
  }
};

//multerImageMiddleware
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 20000000 },
});

export type imageForm = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};

const imageForm = () => [upload.single("file")];

export default imageForm;
