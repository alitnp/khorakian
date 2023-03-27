import { configureStore } from '@reduxjs/toolkit';
import profile from 'redux/reducer/Profile/profileReducer';
import login from 'redux/reducer/Login/loginReducer';
import notification from 'redux/reducer/Notification/notificationReducer';
import setting from 'redux/reducer/Setting/settingReducer';
import toast from 'redux/reducer/Toast/toastReducer';
import postCategory from 'redux/reducer/PostCategory/postCategoryReducer';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    profile,
    login,
    notification,
    setting,
    toast,
    postCategory,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
