import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { packages } from 'global/Models/packagesModels';

type initialState = { list: null | packages[] };
const initialStateValue: initialState = { list: null };
export const packagesSlice = createSlice({
  name: 'packages',
  initialState: initialStateValue,
  reducers: {
    setPackegesList: (state, action: PayloadAction<packages[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setPackegesList } = packagesSlice.actions;
export default packagesSlice.reducer;
