import PageItemStyleController from "@/components/Home/pageItemStyle/pageItemStyleController";
import PageItemStyleData from "@/components/Home/pageItemStyle/pageItemStyleData";
import { PageItemStyle } from "@/components/Home/pageItemStyle/pageItemStyleModel";
import { basicCrud } from "@/routes/globalRouter";

const data = new PageItemStyleData(PageItemStyle);
const controller = new PageItemStyleController(data);

const router = basicCrud(controller, true);

export default router;
