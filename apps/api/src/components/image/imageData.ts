import { Model } from "mongoose";
import { IImage } from "@my/types";

class ImageData {
  Image: Model<IImage, {}, {}, {}, any>;

  constructor(Image: Model<IImage, {}, {}, {}, any>) {
    this.Image = Image;
  }

  createImageFile(file: File) {
    console.log(file);
  }
}

export default ImageData;
