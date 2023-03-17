import { createSlice } from '@reduxjs/toolkit';
import routes from 'global/Constants/routes';
import cookie from 'js-cookie';
import { Redirect } from 'react-router-dom';
import ProtectedRoute from '../../../Route/ProtectedRoute';

const getToken = cookie.get('token');

const initialStateValue = { userName: '', token: getToken, isLoggedIn: !!getToken, prevPath: '', expireIn: '' };
export const loginSlice = createSlice({
  name: 'login',
  initialState: { value: initialStateValue },
  reducers: {
    login: (state, action) => {
      state.value = { ...state.value, isBranchUser: (cookie?.get('isBranchUser') && JSON.parse(cookie?.get('isBranchUser'))) || false, ...action.payload };
    },
    logout: (state) => {
      cookie.remove('token');
      cookie.remove('profile');
      cookie.remove('isBranchUser');
      const theme = localStorage.getItem('theme');
      localStorage.clear();
      localStorage.setItem('theme', theme);
      state.value = { ...state.value, token: '', isLoggedIn: false, prevPath: null };
      <ProtectedRoute render={() => <Redirect to={{ pathname: routes.login.path }} />} />;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
