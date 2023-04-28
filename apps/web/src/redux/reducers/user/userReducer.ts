
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserRead } from '@my/types';

const initialState: { user: IUserRead|undefined } = {
	user: undefined,
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserRead>) => {
      state.user = action.payload
    }
  }
});


export const { setUser } = userReducer.actions;
export default userReducer.reducer;
