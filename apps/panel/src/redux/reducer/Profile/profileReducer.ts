import { IUserRead } from '@my/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import cookie from 'js-cookie';

type initialState = { userProfile: null | IUserRead };
const initialStateValue: initialState = { userProfile: null };
export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialStateValue,
  reducers: {
    setUserProfile: (state, action: PayloadAction<IUserRead>) => {
      state.userProfile = action.payload;
    },
  },
});

export const { setUserProfile } = profileSlice.actions;

export default profileSlice.reducer;
