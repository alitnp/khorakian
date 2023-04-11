import ExperienceCategoryController from "@/components/experienceCategory/experienceController";
import ExperienceCategoryData from "@/components/experienceCategory/experienceData";
import { ExperienceCategory } from "@/components/experienceCategory/experienceModel";
import { basicCrud } from "@/routes/globalRouter";

const data = new ExperienceCategoryData(ExperienceCategory);
const controller = new ExperienceCategoryController(data);

const router = basicCrud(controller, true);

export default router;
