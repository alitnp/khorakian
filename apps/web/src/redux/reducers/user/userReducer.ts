import {
	createSlice,
	PayloadAction,
} from "@reduxjs/toolkit";
import { IUserRead } from "@my/types";
import { getCookie, deleteCookie } from "cookies-next";
import webConfig from "@/global/constants/webConfig";

const token = getCookie(webConfig.cookieTokenName);

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
			state.loggedIn = true;
		},
		setUserLoggedIn: (
			state,
			action: PayloadAction<boolean>
		) => {
			state.loggedIn = action.payload;
		},
		logout: (state) => {
			deleteCookie(webConfig.cookieTokenName);
			state.user = undefined;
			state.loggedIn = false;
		},
	},
});

export const { setUser, setUserLoggedIn, logout } =
	userReducer.actions;
export default userReducer.reducer;
