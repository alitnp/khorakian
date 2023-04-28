import { IPageItemSorting } from '@my/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialState = { list: null | IPageItemSorting[] };
const initialStateValue: initialState = { list: null };
export const pageItemSortingSlice = createSlice({
  name: 'pageItemSorting',
  initialState: initialStateValue,
  reducers: {
    setPageItemSortingList: (state, action: PayloadAction<IPageItemSorting[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setPageItemSortingList } = pageItemSortingSlice.actions;

export default pageItemSortingSlice.reducer;
