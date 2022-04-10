import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsersThunk } from "../models/address";

export const useUserAddresses = () => {
	const addresses = useSelector((state) => state.address.users);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!addresses.length) {
			dispatch(loadUsersThunk());
		}
	}, [dispatch, addresses.length]);

	return addresses;
};
