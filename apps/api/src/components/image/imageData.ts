import fs from "fs";
import { Model } from "mongoose";
import { IImage } from "@my/types";
import { imageForm } from "@/middlewares/imageForm";
import { publicFolder } from "@/config";
import ServerError from "@/helpers/error/ServerError";

class ImageData {
  private Image: Model<IImage, {}, {}, {}, any>;

  constructor(Image: Model<IImage, {}, {}, {}, any>) {
    this.Image = Image;
  }

  createImageFile = async (file: imageForm): Promise<IImage> => {
    const imageFormat = file.mimetype.split("/")[1];
    const image = new this.Image({
      fileName: "temp",
      format: imageFormat,
      pathname: "temp",
      temp: true,
      size: file.size,
    });

    //rename imageFile to IMG- + image._id on hardDrive
    const imageId = image._id;
    const newFileName = "IMG-" + imageId + "." + imageFormat;
    fs.rename(
      publicFolder.path + "/image/" + file.filename,
      publicFolder.path + "/image/" + newFileName,
      (error: any) => {
        if (error) throw new ServerError();
      },
    );

    image.fileName = newFileName;
    image.pathname = "/image/" + newFileName;
    return await image.save();
  };
}

export default ImageData;
