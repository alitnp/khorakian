import {
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";
import { IUserRead } from "@my/types";
import { getCookie } from "cookies-next";

const token = getCookie("token");

const initialState: {
	user: IUserRead | undefined;
	loggedIn: boolean;
} = {
	user: undefined,
	loggedIn: !!token,
};

export const userReducer = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUserRead>) => {
			state.user = action.payload;
		},
		setUserLoggedIn: (
			state,
			action: PayloadAction<boolean>
		) => {
			state.loggedIn = action.payload;
		},
	},
});

export const { setUser, setUserLoggedIn } =
	userReducer.actions;
export default userReducer.reducer;
