import { Router } from "express";
import userRoutes from "@/components/user/userRoutes";
import postCategoryRoutes from "@/components/postCategory/postCategoryRoutes";
import imageRoutes from "@/components/image/imageRoutes";
import videoRoutes from "@/components/video/videoRoutes";
import ideaCategoryRoutes from "@/components/ideaCategory/ideaCategoryRoutes";
import experienceCategory from "@/components/experienceCategory/experienceRoutes";

const router = Router();

// router.get("/", sanitizer(appKeyValidator), HomeController.getAppInfo);

router.use("/user", userRoutes);
router.use("/postcategory", postCategoryRoutes);
router.use("/ideaCategory", ideaCategoryRoutes);
router.use("/experienceCategory", experienceCategory);
router.use("/image", imageRoutes);
router.use("/video", videoRoutes);

export default router;
