import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signalTypes } from 'global/Models/genericRoutesModels/SignalTypesModel';

type initialState = { list: null | signalTypes[] };
const initialStateValue: initialState = { list: null };
export const signalTypesSlice = createSlice({
  name: 'signalTypes',
  initialState: initialStateValue,
  reducers: {
    setSignalTypesList: (state, action: PayloadAction<signalTypes[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setSignalTypesList } = signalTypesSlice.actions;

export default signalTypesSlice.reducer;
