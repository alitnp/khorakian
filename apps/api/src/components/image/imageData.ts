import { Model } from "mongoose";
import { ApiDataListResponse, IImage } from "@my/types";
import { fileForm } from "@/middlewares/fileForm";
import { publicFolder } from "@/config";
import { fileDelete, fileRename } from "@/utils/file";
import { convertImageToWebp, convertImageToSmallWebp } from "@/utils/image";
import { getAllData, IData } from "@/data/globalData";
import { ConflictError, NotFoundError } from "@/helpers/error";

class ImageData implements IData<IImage> {
  private Image: Model<IImage, {}, {}, {}, any>;

  constructor(Image: Model<IImage, {}, {}, {}, any>) {
    this.Image = Image;
  }

  getAll = async (req: Req): Promise<ApiDataListResponse<IImage>> => {
    const searchQuery: any = {};
    if (req.query.title)
      searchQuery.title = { $regex: req.query.title, $options: "i" };
    if (req.query._id) searchQuery._id = req.query._id;

    return getAllData<IImage>(searchQuery, req, this.Image);
  };

  get = async (id: string): Promise<IImage> => {
    const image = await this.Image.findById(id);
    if (!image) throw new NotFoundError("عکس مورد نظر یافت نشد.");

    return image;
  };

  //! fake data : dont use it
  create = async (image: IImage): Promise<IImage> => {
    return image;
  };

  update = async ({ _id, title }: IImage): Promise<IImage> => {
    const image = await this.Image.findById(_id);
    if (!image) throw new NotFoundError();

    const existingContentType = await this.Image.findOne({ title });
    if (!!existingContentType) throw new ConflictError();

    image.title = title;

    return await image.save();
  };

  remove = async (id: string): Promise<IImage> => {
    const image = await this.Image.findById(id);
    if (!image) throw new NotFoundError();

    //check if image is used

    await this.Image.findByIdAndDelete(id);

    if (image.thumbnailPathname)
      await fileDelete(publicFolder.path + image.thumbnailPathname);
    await fileDelete(publicFolder.path + image.pathname);

    return image;
  };

  createImageFile = async (file: fileForm, title?: string): Promise<IImage> => {
    //create a temp mongoose object from multer file to generate a valid _id
    const imageFormat = file.mimetype.split("/")[1];
    const image = new this.Image({
      fileName: "temp",
      format: imageFormat,
      pathname: "temp",
    });
    if (title) image.title = title;

    //pathname and filename variables
    const imageDir = publicFolder.path + "/image/";
    const imageId = image._id;
    const newOriginFormatFileName = "IMG-" + imageId + "." + imageFormat;
    const webpFileName = "IMG-" + imageId + ".webp";
    const smallWebpFileName = "IMG-" + imageId + "-s.webp";

    //rename temp file created by multer to _id and add original file format
    await fileRename(
      imageDir + file.filename,
      imageDir + newOriginFormatFileName,
    );

    //detect if converting and resizing image was successfull
    let webpCreated = false;
    let smallWebpCreated = false;
    let imageData;
    //try create a webp format file from image
    try {
      imageData = await convertImageToWebp(
        imageDir + newOriginFormatFileName,
        imageDir + webpFileName,
      );
      webpCreated = true;
    } catch (error) {
      console.log("sharp crash : ", error);
    }
    //if creating a webp format was successfull then delete original image then try create a small image
    let smallImageData;
    if (webpCreated) {
      //delete origin file
      await fileDelete(imageDir + newOriginFormatFileName);
      //try resize
      try {
        smallImageData = await convertImageToSmallWebp(
          imageDir + webpFileName,
          imageDir + smallWebpFileName,
        );
        smallWebpCreated = true;
      } catch (error) {
        console.log("sharp crash : ", error);
      }
    }

    //if converted to webp store new image date in database otherwise store origin file metadata
    if (webpCreated) {
      image.fileName = webpFileName;
      image.pathname = "/image/" + webpFileName;
      image.format = "webp";
      //if resize was success then store thumbnal pathname
      if (smallWebpCreated)
        image.thumbnailPathname = "/image/" + smallWebpFileName;
    } else {
      image.fileName = newOriginFormatFileName;
      image.pathname = "/image/" + newOriginFormatFileName;
    }
    if (imageData) {
      image.width = imageData.width;
      image.height = imageData.height;
    }
    if (smallImageData) {
      image.thumbnailWidth = smallImageData.width;
      image.thumbnailWidthHeight = smallImageData.height;
    }
    return await image.save();
  };
}

export default ImageData;
