//@ts-ignore
import multer, { DestinationCallback } from "multer";
import BadRequestError from "@/helpers/error/BadRequestError";
import CONFIG from "@/config";

//multerStorage
const multerImageStorage = multer.diskStorage({
  destination: (_req: Req, _file: any, cb: DestinationCallback) => {
    cb(null, CONFIG.APP.STATIC_FILES_PATH + "/image");
  },
  // filename: (_req: Req, file: any, cb: DestinationCallback) => {
  //   const ext = file.mimetype.split("/")[1];

  //   cb(null, `image/temp-image-${Date.now()}.${ext}`);
  // },
});
const multerVideoStorage = multer.diskStorage({
  destination: (_req: Req, _file: any, cb: DestinationCallback) => {
    cb(null, CONFIG.APP.STATIC_FILES_PATH + "/video");
  },
});
// Multer Filter
const multerImageFilter = (_req: Req, file: any, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new BadRequestError("فرمت عکس ارسال شده قابل قبول نیست."), false);
  }
};
const multerVideoFilter = (_req: Req, file: any, cb: any) => {
  if (file.mimetype.startsWith("video")) {
    cb(null, true);
  } else {
    cb(new BadRequestError("فرمت ویدیو ارسال شده قابل قبول نیست."), false);
  }
};

//multerMiddleware
const imageUpload = multer({
  storage: multerImageStorage,
  fileFilter: multerImageFilter,
  limits: { fileSize: 20000000 },
});
const videoUpload = multer({
  storage: multerVideoStorage,
  fileFilter: multerVideoFilter,
  limits: { fileSize: 400000000 },
});

//types
export type fileForm = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};

export const imageForm = () => [imageUpload.single("file")];
export const videoForm = () => [videoUpload.single("file")];
