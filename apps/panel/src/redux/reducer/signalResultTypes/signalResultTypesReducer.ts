import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signalResultTypes } from 'global/Models/genericRoutesModels/SignalResultTypesModel';

type initialState = { list: null | signalResultTypes[] };
const initialStateValue: initialState = { list: null };
export const signalResultTypesSlice = createSlice({
  name: 'signalResultTypes',
  initialState: initialStateValue,
  reducers: {
    setSignalResultTypesList: (state, action: PayloadAction<signalResultTypes[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setSignalResultTypesList } = signalResultTypesSlice.actions;

export default signalResultTypesSlice.reducer;
