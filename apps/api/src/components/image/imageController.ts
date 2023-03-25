import { IImage } from "@my/types";
import BadRequestError from "@/helpers/error/BadRequestError";
import { fileForm } from "@/middlewares/fileForm";
import { apiDataResponse } from "@/helpers/apiResponse";
import BaseController from "@/controller/globalControllers";
import { IData } from "@/data/globalData";

class ImageController extends BaseController<IImage> {
  constructor(data: IData<IImage>) {
    super(data);
  }
  createImageFile = async (req: Req, res: Res) => {
    const tempReq = req as Req & { file: fileForm };
    if (!tempReq.file) throw new BadRequestError("فایل عکس یافت نشد.");
    const image = await this.data.createImageFile(
      tempReq.file,
      tempReq.body.title,
    );
    return res.send(apiDataResponse<IImage>(image));
  };
}

export default ImageController;
