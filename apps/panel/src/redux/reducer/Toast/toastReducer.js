import { createSlice } from '@reduxjs/toolkit';
import { Slide, toast } from 'react-toastify';

export const toastSlice = createSlice({
  name: 'toast',
  initialState: { toastData: null },
  reducers: {
    emptyToastData: (state) => {
      state.toastData = null;
    },
    setNotificationData: (_state, { payload }) => {
      // state.toastData = {
      //   type: action.payload.type,
      //   message: action.payload.message,
      //   time: action.payload.time,
      // };
      if (!payload?.type) payload.type = 'success';
      if (payload?.message) {
        toast[payload.type](payload.message, {
          position: 'bottom-center',
          autoClose: payload?.time || 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          pauseOnFocusLoss: false,
          progress: undefined,
          transition: Slide,
        });
      }
    },
  },
});

export const { emptyToastData, setNotificationData } = toastSlice.actions;

export default toastSlice.reducer;
