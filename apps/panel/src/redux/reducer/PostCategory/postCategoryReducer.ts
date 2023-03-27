import { IPostCategory } from '@my/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialState = { list: null | IPostCategory[] };
const initialStateValue: initialState = { list: null };
export const postCategorySlice = createSlice({
  name: 'postCategory',
  initialState: initialStateValue,
  reducers: {
    setPostCategoryList: (state, action: PayloadAction<IPostCategory[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setPostCategoryList } = postCategorySlice.actions;

export default postCategorySlice.reducer;
