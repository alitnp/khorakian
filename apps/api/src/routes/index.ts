import { Router } from "express";
import userRoutes from "@/components/user/userRoutes";
import postCategoryRoutes from "@/components/Post/postCategory/postCategoryRoutes";
import imageRoutes from "@/components/image/imageRoutes";
import videoRoutes from "@/components/video/videoRoutes";
import ideaCategoryRoutes from "@/components/Idea/ideaCategory/ideaCategoryRoutes";
import ideaRoutes from "@/components/Idea/idea/ideaRoutes";
import experienceCategory from "@/components/experience/experienceCategory/experienceCategoryRoutes";
import postRoutes from "@/components/Post/post/postRoutes";
import historyRoutes from "@/components/Home/history/historyRoutes";
import pageItemTypeRoutes from "@/components/Home/pageItemType/pageItemTypeRoutes";
import pageItemSortingRoutes from "@/components/Home/pageItemSorting/pageItemSortingRoutes";
import pageItemStyleRoutes from "@/components/Home/pageItemStyle/pageItemStyleRoutes";
import sliderRoutes from "@/components/Home/silder/sliderRoutes";
import pageItemRoutes from "@/components/Home/pageItem/pageItemRoutes";

const router = Router();

// router.get("/", sanitizer(appKeyValidator), HomeController.getAppInfo);

//!E-e
router.use("/experienceCategory", experienceCategory);

//!H-i
router.use("/history", historyRoutes);

//!I-i
router.use("/ideaCategory", ideaCategoryRoutes);
router.use("/image", imageRoutes);
router.use("/idea", ideaRoutes);

//!P-p
router.use("/pageItemSorting", pageItemSortingRoutes);
router.use("/pageItemStyle", pageItemStyleRoutes);
router.use("/pageItemType", pageItemTypeRoutes);
router.use("/pageItem", pageItemRoutes);
router.use("/post", postRoutes);
router.use("/postcategory", postCategoryRoutes);

//!S-s
router.use("/slider", sliderRoutes);

//!U-u
router.use("/user", userRoutes);

//!V-v
router.use("/video", videoRoutes);

export default router;
