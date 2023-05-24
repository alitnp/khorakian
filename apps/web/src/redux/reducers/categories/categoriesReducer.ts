import {
	IExperienceCategory,
	IIdeaCategory,
	IPostCategory,
} from "@my/types";
import {
	PayloadAction,
	createSlice,
} from "@reduxjs/toolkit";

type initialState = {
	experienceCategoryList: IExperienceCategory[] | undefined;
	postCategoryList: IPostCategory[] | undefined;
	ideaCategoryList: IIdeaCategory[] | undefined;
};

const initialState: initialState = {
	experienceCategoryList: undefined,
	postCategoryList: undefined,
	ideaCategoryList: undefined,
};

export const categoriesReducer = createSlice({
	name: "categories",
	initialState,
	reducers: {
		setExperienceCategories: (
			state,
			{ payload }: PayloadAction<IExperienceCategory[]>
		) => {
			state.experienceCategoryList = payload;
		},
		setPostCategories: (
			state,
			{ payload }: PayloadAction<IPostCategory[]>
		) => {
			state.postCategoryList = payload;
		},
		setIdeaCategories: (
			state,
			{ payload }: PayloadAction<IIdeaCategory[]>
		) => {
			state.ideaCategoryList = payload;
		},
	},
});

export const {
	setExperienceCategories,
	setPostCategories,
	setIdeaCategories,
} = categoriesReducer.actions;
export default categoriesReducer.reducer;
