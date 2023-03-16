import { IData } from "@/data/globalData";
import BaseController from "@/controller/globalControllers";
import { IContentType } from "@/components/contentType/contentTypeModel";

class ContentTypeController extends BaseController<IContentType> {
  constructor(data: IData<IContentType>) {
    super(data);
  }
}

export default ContentTypeController;
