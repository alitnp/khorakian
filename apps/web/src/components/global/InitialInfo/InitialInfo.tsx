import { getCurrentUser } from "@/redux/reducers/user/getCurrentUser";
import { RootState, store } from "@/redux/store";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

const InitialInfo: FC = () => {
	const { loggedIn, user } = useSelector(
		(state: RootState) => state.user
	);

	useEffect(() => {
		if (loggedIn && !user) store.dispatch(getCurrentUser());
	}, [loggedIn, user]);

	return <></>;
};

export default InitialInfo;
