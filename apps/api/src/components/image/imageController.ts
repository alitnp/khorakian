import { IImage } from "@my/types";
import BadRequestError from "@/helpers/error/BadRequestError";
import ImageData from "@/components/image/imageData";
import { fileForm } from "@/middlewares/fileForm";
import { apiDataResponse } from "@/helpers/apiResponse";

class ImageController {
  private data: ImageData;
  constructor(data: ImageData) {
    this.data = data;
  }
  create = async (req: Req, res: Res) => {
    const tempReq = req as Req & { file: fileForm };
    if (!tempReq.file) throw new BadRequestError("فایل عکس یافت نشد.");
    const image = await this.data.createImageFile(tempReq.file);
    return res.send(apiDataResponse<IImage>(image));
  };
}

export default ImageController;
