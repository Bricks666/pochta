import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserThunk } from "../models/user";

export const useUser = () => {
	const { info, isLoading } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!info.name) {
			dispatch(loadUserThunk());
		}
	}, [dispatch, info.name]);

	return { info, isLoading };
};
