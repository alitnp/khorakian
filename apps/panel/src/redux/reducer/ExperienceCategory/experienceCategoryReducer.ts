import { IExperienceCategory } from '@my/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialState = { list: null | IExperienceCategory[] };
const initialStateValue: initialState = { list: null };
export const experienceCategorySlice = createSlice({
  name: 'experienceCategory',
  initialState: initialStateValue,
  reducers: {
    setExperienceCategoryList: (state, action: PayloadAction<IExperienceCategory[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setExperienceCategoryList } = experienceCategorySlice.actions;

export default experienceCategorySlice.reducer;
