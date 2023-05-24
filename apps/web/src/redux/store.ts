import { configureStore } from "@reduxjs/toolkit";
import user from "@/redux/reducers/user/userReducer";
import categories from "@/redux/reducers/categories/categoriesReducer";

export const store = configureStore({
	reducer: {
		user,
		categories,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
