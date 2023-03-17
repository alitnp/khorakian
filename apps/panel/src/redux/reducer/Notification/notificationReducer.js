import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  loading: false,
  notificationList: null,
  myNotifications: null,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialStateValue,
  reducers: {
    setNotificationLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setNotificationList: (state, { payload }) => {
      state.notificationList = payload;
    },
    setMyNotifications: (state, { payload }) => {
      state.myNotifications = payload;
    },
  },
});

export const { setNotificationLoading, setNotificationList, setMyNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
