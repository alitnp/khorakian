import { configureStore } from '@reduxjs/toolkit';
import profile from 'redux/reducer/Profile/profileReducer';
import login from 'redux/reducer/Login/loginReducer';
import notification from 'redux/reducer/Notification/notificationReducer';
import setting from 'redux/reducer/Setting/settingReducer';
import toast from 'redux/reducer/Toast/toastReducer';
import postCategory from 'redux/reducer/PostCategory/postCategoryReducer';
import ideaCategory from 'redux/reducer/IdeaCategory/ideaCategoryReducer';
import experienceCategory from 'redux/reducer/ExperienceCategory/experienceCategoryReducer';
import userExperienceCategory from 'redux/reducer/UserExperienceCategory/UserExperienceCategoryReducer';
import pageItemType from 'redux/reducer/PageItemType/pageItemTypeReducer';
import pageItemStyle from 'redux/reducer/PageItemStyle/pageItemStyleReducer';
import pageItemSorting from 'redux/reducer/PageItemSorting/pageItemSortingReducer';

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
    ideaCategory,
    experienceCategory,
    userExperienceCategory,
    pageItemType,
    pageItemSorting,
    pageItemStyle,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
