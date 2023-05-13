import { IPageItemType } from '@my/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialState = { list: null | IPageItemType[] };
const initialStateValue: initialState = { list: null };
export const pageItemTypeSlice = createSlice({
  name: 'pageItemType',
  initialState: initialStateValue,
  reducers: {
    setPageItemTypeList: (state, action: PayloadAction<IPageItemType[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setPageItemTypeList } = pageItemTypeSlice.actions;

export default pageItemTypeSlice.reducer;
