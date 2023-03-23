import { Model } from "mongoose";
import { IImage } from "@my/types";
import { fileForm } from "@/middlewares/fileForm";
import { publicFolder } from "@/config";
import { fileDelete, fileRename } from "@/utils/file";
import { convertImageToWebp, convertImageToSmallWebp } from "@/utils/image";
import { NotFoundError } from "@/helpers/error";

class ImageData {
  private Image: Model<IImage, {}, {}, {}, any>;

  constructor(Image: Model<IImage, {}, {}, {}, any>) {
    this.Image = Image;
  }

  createImageFile = async (file: fileForm): Promise<IImage> => {
    //create a temp mongoose object from multer file to generate a valid _id
    const imageFormat = file.mimetype.split("/")[1];
    const image = new this.Image({
      fileName: "temp",
      format: imageFormat,
      pathname: "temp",
      temp: true,
    });

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

    //try create a webp format file from image
    try {
      await convertImageToWebp(
        imageDir + newOriginFormatFileName,
        imageDir + webpFileName,
      );
      webpCreated = true;
    } catch (error) {
      console.log("sharp crash : ", error);
    }

    //if creating a webp format was successfull then delete original image then try create a small image
    if (webpCreated) {
      //delete origin file
      await fileDelete(imageDir + newOriginFormatFileName);
      //try resize
      try {
        await convertImageToSmallWebp(
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
    return await image.save();
  };

  imageWasUsed = async (id: string): Promise<IImage> => {
    const image = await this.Image.findByIdAndUpdate(id, {
      $set: { temp: false },
    });
    if (!image) throw new NotFoundError("عکس مورد نظر یافت نشد.");

    return await image.save();
  };
  manyImageWasUsed = async (idArray: string[]): Promise<IImage[]> => {
    const updatedImages: IImage[] = [];

    for (let i = 0; i < idArray.length; i++) {
      const id = idArray[i];
      const image = await this.Image.findByIdAndUpdate(id, {
        $set: { temp: false },
      });
      image && updatedImages.push(image);
    }

    return updatedImages;
  };
}

export default ImageData;
