import { IPageItemStyle } from '@my/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialState = { list: null | IPageItemStyle[] };
const initialStateValue: initialState = { list: null };
export const pageItemStyleSlice = createSlice({
  name: 'pageItemStyle',
  initialState: initialStateValue,
  reducers: {
    setPageItemStyleList: (state, action: PayloadAction<IPageItemStyle[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setPageItemStyleList } = pageItemStyleSlice.actions;

export default pageItemStyleSlice.reducer;
