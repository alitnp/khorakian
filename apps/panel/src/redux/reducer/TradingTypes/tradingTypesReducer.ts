import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tradingTypes } from 'global/Models/genericRoutesModels/TradingTypesModel';

type initialState = { list: null | tradingTypes[] };
const initialStateValue: initialState = { list: null };
export const tradingTypesSlice = createSlice({
  name: 'tradingTypes',
  initialState: initialStateValue,
  reducers: {
    setTradingTypesList: (state, action: PayloadAction<tradingTypes[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setTradingTypesList } = tradingTypesSlice.actions;

export default tradingTypesSlice.reducer;
