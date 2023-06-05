import { IImage } from "@my/types";
import BadRequestError from "@/helpers/error/BadRequestError";
import { fileForm } from "@/middlewares/fileForm";
import { apiDataResponse } from "@/helpers/apiResponse";
import BaseController from "@/controller/globalControllers";
import { IData } from "@/data/globalData";
import { getUserIdFromReq } from "@/utils/util";
import { UnauthenticatedError } from "@/helpers/error";

class ImageController extends BaseController<IImage> {
  constructor(data: IData<IImage>) {
    super(data);
  }
  createImageFile = async (req: Req, res: Res) => {
    const userId = getUserIdFromReq(req);
    if (!userId) throw new UnauthenticatedError();
    const tempReq = req as Req & { file: fileForm };
    if (!tempReq.file) throw new BadRequestError("فایل عکس یافت نشد.");
    const image = await this.data.createImageFile(
      tempReq.file,
      userId,
      tempReq.body.title,
    );
    res.send(apiDataResponse<IImage>(image));
  };
}

export default ImageController;
