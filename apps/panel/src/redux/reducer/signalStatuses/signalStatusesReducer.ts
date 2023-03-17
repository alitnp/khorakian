import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signalStatuses } from 'global/Models/genericRoutesModels/SignalStatusesModel';

type initialState = { list: null | signalStatuses[] };
const initialStateValue: initialState = { list: null };
export const signalStatusesSlice = createSlice({
  name: 'signalStatuses',
  initialState: initialStateValue,
  reducers: {
    setSignalStatusesList: (state, action: PayloadAction<signalStatuses[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setSignalStatusesList } = signalStatusesSlice.actions;

export default signalStatusesSlice.reducer;
