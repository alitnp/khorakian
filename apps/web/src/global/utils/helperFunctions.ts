import webRoutes from "@/global/constants/webRoutes";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
	IExperienceRead,
	IImage,
	IPostRead,
} from "@my/types";

export const englishNumberOnly = (
	input: string,
	allowCammaAndDot?: boolean,
	allowDot?: boolean
) => {
	if (input === null || input === undefined) return "";
	input = input.toString();
	if (!allowCammaAndDot && !allowDot)
		input = input.replace(/[^۰۱۲۳۴۵۶۷۸۹0123456789]/g, "");
	if (allowCammaAndDot)
		input = input.replace(/[^۰۱۲۳۴۵۶۷۸۹0123456789,.]/g, "");
	if (!allowCammaAndDot && allowDot)
		input = input.replace(/[^۰۱۲۳۴۵۶۷۸۹0123456789.]/g, "");

	input = input.replace(/ /g, "");
	input = input.replace(/۰/g, "0");
	input = input.replace(/۱/g, "1");
	input = input.replace(/۲/g, "2");
	input = input.replace(/۳/g, "3");
	input = input.replace(/۴/g, "4");
	input = input.replace(/۵/g, "5");
	input = input.replace(/۶/g, "6");
	input = input.replace(/۷/g, "7");
	input = input.replace(/۸/g, "8");
	input = input.replace(/۹/g, "9");

	return input;
};

export const getThumbnailFromContent = (
	item: any
): {
	imagePathname: string;
	width: number;
	height: number;
	imageAlt: string;
	isVideo: boolean;
} => {
	if (
		item.videos.length > 0 &&
		!!item.videos[0]?.thumbnail?.thumbnailPathname
	)
		return {
			imagePathname:
				item.videos[0].thumbnail.thumbnailPathname,
			width: item.videos[0].thumbnail.width,
			height: item.videos[0].thumbnail.height,
			imageAlt: item.videos[0].title,
			isVideo: true,
		};
	if (
		!!item.video &&
		!!item.video?.thumbnail?.thumbnailPathname
	)
		return {
			imagePathname: item.video.thumbnail.thumbnailPathname,
			width: item.video.thumbnail.width,
			height: item.video.thumbnail.height,
			imageAlt: item.video.title,
			isVideo: true,
		};

	if (
		item.images?.length > 0 &&
		!!item.images[0]?.thumbnailPathname
	)
		return {
			imagePathname: item.images[0].thumbnailPathname,
			width: item.images[0].width,
			height: item.images[0].height,
			imageAlt: item.images[0].title,
			isVideo: item.videos.length > 0 || !!item.video,
		};

	if (!!item.image && !!item.image.thumbnailPathname)
		return {
			imagePathname: item.image.thumbnailPathname,
			width: item.image.width,
			height: item.image.height,
			imageAlt: item.image.title,
			isVideo: item.videos.length > 0 || !!item.video,
		};

	return {
		imagePathname: "",
		width: 0,
		height: 0,
		imageAlt: "",
		isVideo: false,
	};
};

export const getMoreUrlPathFromPageItem = (
	pageItemType: string
) => {
	if (pageItemType === "post")
		return webRoutes.postAllContents.path;
	if (
		pageItemType === "experience" ||
		pageItemType === "userExperience"
	)
		return webRoutes.experiencePage.path;
	if (pageItemType === "idea" || pageItemType === "userIdea")
		return webRoutes.ideaAllContents.path;
};

export const getDetailPathnameforPageItem = (
	pageItemType: string
) => {
	if (pageItemType === "post")
		return webRoutes.postDetail.path;
	if (pageItemType === "experience")
		return webRoutes.experienceDetail.path;
	if (pageItemType === "userExperience")
		return webRoutes.userExperienceDetail.path;
	if (pageItemType === "idea" || pageItemType === "userIdea")
		return webRoutes.ideaDetail.path;
};

export const getCategoryKeyNameFormPageItem = (
	pageItemType: string
): string => {
	if (pageItemType === "post") return "postCategory";
	if (
		pageItemType === "experience" ||
		pageItemType === "userExperience"
	)
		return "experienceCategory";
	if (pageItemType === "idea" || pageItemType === "userIdea")
		return "ideaCategory";
	return "post";
};

export const dateObjectFormatter = (
	date: any,
	format = "YYYY/MM/DD"
) =>
	new DateObject({
		date,
		locale: persian_fa,
		calendar: persian,
	}).format(format);

export const getImageFromContent = (
	content: IPostRead | IExperienceRead
): IImage | null => {
	if (
		content.images.length === 0 &&
		content.videos.length === 0
	)
		return null;
	if (!!content.videos[0]?.thumbnail)
		return content.videos[0].thumbnail;
	return content.images[0];
};

const persianNumbers: Record<number, string> = {
	0: "۰",
	1: "۱",
	2: "۲",
	3: "۳",
	4: "۴",
	5: "۵",
	6: "۶",
	7: "۷",
	8: "۸",
	9: "۹",
};

export const replaceNumbersWithPersian = (input) => {
	if (input === undefined || input === null) return "";
	// Convert the input to a string if it is a number
	let str =
		typeof input === "number" ? input.toString() : input;
	// Split the string into an array of characters
	let chars = str.split("");
	// Loop through the array and replace each number with its Persian equivalent using the mapping object
	for (let i = 0; i < chars.length; i++) {
		// Check if the character is a number
		if (chars[i] >= "0" && chars[i] <= "9") {
			// Replace the character with its Persian equivalent using the mapping object
			chars[i] = persianNumbers[chars[i]];
		}
	}
	// Join the array back into a string and return it
	return chars.join("");
};
