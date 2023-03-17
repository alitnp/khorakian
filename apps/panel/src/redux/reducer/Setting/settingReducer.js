import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  filterWrapperStatus: localStorage.getItem('filterWrapperStatus') || 'open',
  showNotifications: localStorage.getItem('showNotifications') || 'hidden',
  // showNotifications: localStorage.getItem('showNotifications') || 'hidden',
  fullScreen: false,
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState: initialState,
  reducers: {
    setSettingSwitchTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);

      state.theme = newTheme;
    },
    setSettingSwitchFilterWrapperStatus: (state) => {
      const newSatus = state.filterWrapperStatus === 'close' ? 'open' : 'close';
      localStorage.setItem('filterWrapperStatus', newSatus);

      state.filterWrapperStatus = newSatus;
    },
    setSettingSwitchShowNotificationsStatus: (state) => {
      const newSatus = state.showNotifications === 'hidden' ? 'show' : 'hidden';
      localStorage.setItem('showNotifications', newSatus);

      state.showNotifications = newSatus;
    },
    setSettingFullScreen: (state, { payload }) => {
      state.fullScreen = payload;
    },
  },
});

export const { setSettingSwitchTheme, setSettingFullScreen, setSettingSwitchFilterWrapperStatus, setSettingSwitchShowNotificationsStatus } = settingSlice.actions;
export default settingSlice.reducer;
