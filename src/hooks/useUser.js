import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadUserThunk, resetUserThunk } from "../models/user";

export const useUser = () => {
	const { info, isLoading } = useSelector((state) => state.user);

	useEffect(() => {
		if (!isLoading && !info.name) {
			loadUserThunk();
			return () => {
				if (info.name) {
					resetUserThunk();
				}
			};
		}
	}, [info.name, isLoading]);

	return { info, isLoading };
};
