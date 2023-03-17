import { createSlice } from '@reduxjs/toolkit';
import cookie from 'js-cookie';

const initialStateValue = { userProfile: null };
export const profileSlice = createSlice({
  name: 'profile',
  initialState: { value: initialStateValue },
  reducers: {
    setUserProfile: (state, { payload }) => {
      state.value.userProfile = payload;
    },
  },
});

export const { profile, setUserProfile } = profileSlice.actions;

export default profileSlice.reducer;
