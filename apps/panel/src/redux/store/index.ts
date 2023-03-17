import { configureStore } from '@reduxjs/toolkit';
import profile from 'redux/reducer/Profile/profileReducer';
import login from 'redux/reducer/Login/loginReducer';
import notification from 'redux/reducer/Notification/notificationReducer';
import setting from 'redux/reducer/Setting/settingReducer';
import timeFrames from 'redux/reducer/TimeFrames/timeFramesReducer';
import tradingTypes from 'redux/reducer/TradingTypes/tradingTypesReducer';
import signalResultTypes from 'redux/reducer/signalResultTypes/signalResultTypesReducer';
import evidence from 'redux/reducer/evidence/evidenceReducer';
import paymentTypes from 'redux/reducer/paymentTypes/paymentTypesReducer';
import effectivePointTypes from 'redux/reducer/effectivePointTypes/effectivePointTypesReducer';
import signalStatuses from 'redux/reducer/signalStatuses/signalStatusesReducer';
import signalTypes from 'redux/reducer/signalTypes/signalTypesReducer';
import strategies from 'redux/reducer/strategies/strategiesReducer';
import toast from 'redux/reducer/Toast/toastReducer';
import packages from 'redux/reducer/packages/packagesReducer';

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
    timeFrames,
    tradingTypes,
    signalResultTypes,
    evidence,
    paymentTypes,
    effectivePointTypes,
    signalStatuses,
    signalTypes,
    strategies,
    packages,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
