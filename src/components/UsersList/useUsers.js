import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsersThunk } from "../../models/users";

export const useUsers = () => {
	const { isLoading, users } = useSelector((state) => state.users);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!users.length) {
			dispatch(loadUsersThunk());
		}
	}, [dispatch, users.length]);

	return { isLoading, users };
};
