import { Router } from "express";
import userRoutes from "@/components/user/userRoutes";
import postCategoryRoutes from "@/components/postCategory/postCategoryRoutes";
import imageRoutes from "@/components/image/imageRoutes";
import videoRoutes from "@/components/video/videoRoutes";
import ideaCategoryRoutes from "@/components/ideaCategory/ideaCategoryRoutes";
import experienceCategory from "@/components/experienceCategory/experienceRoutes";
import postRoutes from "@/components/post/postRoutes";

const router = Router();

// router.get("/", sanitizer(appKeyValidator), HomeController.getAppInfo);

//!E-e
router.use("/experienceCategory", experienceCategory);

//!I-i
router.use("/ideaCategory", ideaCategoryRoutes);
router.use("/image", imageRoutes);

//!P-p
router.use("/post", postRoutes);
router.use("/postcategory", postCategoryRoutes);

//!U-u
router.use("/user", userRoutes);

//!V-v
router.use("/video", videoRoutes);

export default router;
