import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { paymentTypes } from 'global/Models/genericRoutesModels/PaymentTypesModel';

type initialState = { list: null | paymentTypes[] };
const initialStateValue: initialState = { list: null };
export const paymentTypesSlice = createSlice({
  name: 'paymentTypes',
  initialState: initialStateValue,
  reducers: {
    setPaymentTypesList: (state, action: PayloadAction<paymentTypes[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setPaymentTypesList } = paymentTypesSlice.actions;

export default paymentTypesSlice.reducer;
