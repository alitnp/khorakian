import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { timeFrames } from 'global/Models/genericRoutesModels/TimeFramesModel';

type initialState = { list: null | timeFrames[] };
const initialStateValue: initialState = { list: null };
export const timeFrameSlice = createSlice({
  name: 'timeFrames',
  initialState: initialStateValue,
  reducers: {
    setTimeFrameList: (state, action: PayloadAction<timeFrames[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setTimeFrameList } = timeFrameSlice.actions;

export default timeFrameSlice.reducer;
