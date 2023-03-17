import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { strategies } from 'global/Models/genericRoutesModels/StrategiesModel';

type initialState = { list: null | strategies[] };
const initialStateValue: initialState = { list: null };
export const strategiesSlice = createSlice({
  name: 'strategies',
  initialState: initialStateValue,
  reducers: {
    setStrategiesList: (state, action: PayloadAction<strategies[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setStrategiesList } = strategiesSlice.actions;

export default strategiesSlice.reducer;
