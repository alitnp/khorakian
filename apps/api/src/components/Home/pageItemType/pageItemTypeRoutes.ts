import PageItemTypeController from "@/components/Home/pageItemType/pageItemTypeController";
import PageItemTypeData from "@/components/Home/pageItemType/pageItemTypeData";
import { PageItemType } from "@/components/Home/pageItemType/pageItemTypeModel";
import { basicCrud } from "@/routes/globalRouter";

const data = new PageItemTypeData(PageItemType);
const controller = new PageItemTypeController(data);

const router = basicCrud(controller, true);

export default router;
