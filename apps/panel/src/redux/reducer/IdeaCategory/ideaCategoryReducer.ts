import { IIdeaCategory } from '@my/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialState = { list: null | IIdeaCategory[] };
const initialStateValue: initialState = { list: null };
export const ideaCategorySlice = createSlice({
  name: 'ideaCategory',
  initialState: initialStateValue,
  reducers: {
    setIdeaCategoryList: (state, action: PayloadAction<IIdeaCategory[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setIdeaCategoryList } = ideaCategorySlice.actions;

export default ideaCategorySlice.reducer;
