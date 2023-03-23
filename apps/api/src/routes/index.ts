import { Router } from "express";
import userRoutes from "@/components/user/userRoutes";
import postCategoryRoutes from "@/components/postCategory/postCategoryRoutes";
import imageRoutes from "@/components/image/imageRoutes";
import videoRoutes from "@/components/video/videoRoutes";

const router = Router();

// router.get("/", sanitizer(appKeyValidator), HomeController.getAppInfo);

router.use("/user", userRoutes);
router.use("/postcategory", postCategoryRoutes);
router.use("/image", imageRoutes);
router.use("/video", videoRoutes);

export default router;
