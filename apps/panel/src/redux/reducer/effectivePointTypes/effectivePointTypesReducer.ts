import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { effectivePointTypes } from 'global/Models/genericRoutesModels/EffectivePointTypesModel';

type initialState = { list: null | effectivePointTypes[] };
const initialStateValue: initialState = { list: null };
export const effectivePointTypesSlice = createSlice({
  name: 'effectivePointTypes',
  initialState: initialStateValue,
  reducers: {
    setEffectivePointTypesList: (state, action: PayloadAction<effectivePointTypes[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setEffectivePointTypesList } = effectivePointTypesSlice.actions;

export default effectivePointTypesSlice.reducer;
