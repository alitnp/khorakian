//@ts-ignore
import multer, { DestinationCallback } from "multer";
import BadRequestError from "@/helpers/error/BadRequestError";
import CONFIG from "@/config";

//multerStorage
const multerImageStorage = multer.diskStorage({
  destination: (_req: Req, _file: any, cb: DestinationCallback) => {
    cb(null, CONFIG.APP.STATIC_FILES_PATH + "/image");
  },
});
const multerVideoStorage = multer.diskStorage({
  destination: (_req: Req, _file: any, cb: DestinationCallback) => {
    cb(null, CONFIG.APP.STATIC_FILES_PATH + "/video");
  },
});
const multerImageAndVideoStorage = multer.diskStorage({
  destination: (_req: Req, file: any, cb: DestinationCallback) => {
    if (file.fieldname === "video")
      cb(null, CONFIG.APP.STATIC_FILES_PATH + "/video");
    if (file.fieldname === "image")
      cb(null, CONFIG.APP.STATIC_FILES_PATH + "/image");
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
const multerImageAndVideoFilter = (_req: Req, file: any, cb: any) => {
  if (file.fieldname === "video" && !file.mimetype.startsWith("video")) {
    cb(new BadRequestError("فرمت ویدیو ارسال شده قابل قبول نیست."), false);
  } else if (file.fieldname === "image" && !file.mimetype.startsWith("image")) {
    cb(new BadRequestError("فرمت عکس ارسال شده قابل قبول نیست."), false);
  } else {
    cb(null, true);
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
const imageAndVideoUpload = multer({
  storage: multerImageAndVideoStorage,
  fileFilter: multerImageAndVideoFilter,
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

export const imageForm = () => [imageUpload.single("image")];
export const videoForm = () => [videoUpload.single("video")];
export const imageAndVideoForm = () => [
  imageAndVideoUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
];
