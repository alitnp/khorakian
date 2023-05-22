import { Router } from "express";
import userRoutes from "@/components/user/userRoutes";
import postCategoryRoutes from "@/components/Post/postCategory/postCategoryRoutes";
import imageRoutes from "@/components/image/imageRoutes";
import videoRoutes from "@/components/video/videoRoutes";
import ideaCategoryRoutes from "@/components/Idea/ideaCategory/ideaCategoryRoutes";
import ideaRoutes from "@/components/Idea/idea/ideaRoutes";
import experienceCategory from "@/components/experience/experienceCategory/experienceCategoryRoutes";
import experience from "@/components/experience/experience/experienceRoutes";
import userExperience from "@/components/userExperience/userExperience/userExperienceRoutes";
import postRoutes from "@/components/Post/post/postRoutes";
import historyRoutes from "@/components/Home/history/historyRoutes";
import pageItemTypeRoutes from "@/components/Home/pageItemType/pageItemTypeRoutes";
import pageItemSortingRoutes from "@/components/Home/pageItemSorting/pageItemSortingRoutes";
import pageItemStyleRoutes from "@/components/Home/pageItemStyle/pageItemStyleRoutes";
import sliderRoutes from "@/components/Home/silder/sliderRoutes";
import pageItemRoutes from "@/components/Home/pageItem/pageItemRoutes";
import defaultImageRoutes from "@/components/defaultImage/defaultImageRoutes";
import socialMediaRoutes from "@/components/socialMedia/socialMediaRoutes";
import aboutMeRoutes from "@/components/aboutMe/aboutMeRoutes";
import defaultTextRoutes from "@/components/defaultText/defaultTextRoutes";
import directMessgaeRoutes from "@/components/directMessage/directMessageRoutes";

const router = Router();

// router.get("/", sanitizer(appKeyValidator), HomeController.getAppInfo);

//!A-a
router.use("/aboutMe", aboutMeRoutes);

//D-d
router.use("/defaultImage", defaultImageRoutes);
router.use("/defaultText", defaultTextRoutes);
router.use("/directMessage", directMessgaeRoutes);

//!E-e
router.use("/experienceCategory", experienceCategory);
router.use("/experience", experience);

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
router.use("/socialMedia", socialMediaRoutes);

//!U-u
router.use("/userExperience", userExperience);
router.use("/user", userRoutes);

//!V-v
router.use("/video", videoRoutes);

export default router;
