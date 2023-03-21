import { IImage } from "@my/types";
import BadRequestError from "@/helpers/error/BadRequestError";
import ImageData from "@/components/image/imageData";
import { imageForm } from "@/middlewares/imageForm";
import { apiDataResponse } from "@/helpers/apiResponse";

class ImageController {
  private data: ImageData;
  constructor(data: ImageData) {
    this.data = data;
  }
  create = async (req: Req, res: Res) => {
    const tempReq = req as Req & { file: imageForm };
    if (!tempReq.file) throw new BadRequestError("فایل عکس یافت نشد.");
    const image = await this.data.createImageFile(tempReq.file);
    return res.send(apiDataResponse<IImage>(image));
  };

  imageWasUsed = async (req: Req, res: Res) => {
    const id: string = req.params.id;
    if (!id) throw new BadRequestError("شناسه عکس ارسال نشده.");
    const image = await this.data.imageWasUsed(id);
    return res.send(apiDataResponse<IImage>(image));
  };

  manyImageWasUsed = async (req: Req, res: Res) => {
    const ids: string[] = req.body.ids;
    if (!ids || !ids?.length)
      throw new BadRequestError("شناسه عکس ارسال نشده.");
    const images = await this.data.manyImageWasUsed(ids);
    return res.send(apiDataResponse<IImage[]>(images));
  };
}

export default ImageController;
