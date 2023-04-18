import { IUserExperienceCategory } from '@my/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialState = { list: null | IUserExperienceCategory[] };
const initialStateValue: initialState = { list: null };
export const userExperienceCategorySlice = createSlice({
  name: 'userExperienceCategory',
  initialState: initialStateValue,
  reducers: {
    setUserExperienceCategoryList: (state, action: PayloadAction<IUserExperienceCategory[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setUserExperienceCategoryList } = userExperienceCategorySlice.actions;

export default userExperienceCategorySlice.reducer;
