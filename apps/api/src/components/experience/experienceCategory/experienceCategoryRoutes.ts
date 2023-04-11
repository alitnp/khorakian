import ExperienceCategoryData from "@/components/experience/experienceCategory/experienceCategoryData";
import { basicCrud } from "@/routes/globalRouter";

import { ExperienceCategory } from "@/components/experience/experienceCategory/experienceCategoryModel";
import ExperienceCategoryController from "@/components/experience/experienceCategory/experienceCategoryController";

const data = new ExperienceCategoryData(ExperienceCategory);
const controller = new ExperienceCategoryController(data);

const router = basicCrud(controller, true);

export default router;
