import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	loadTransfersThunk,
	resetTransfersAC,
	subscribeFinishTransferThunk,
	subscribeNewTransferThunk,
} from "../../models/transfers";

export const useTransfers = () => {
	const { isLoading, transfers } = useSelector((state) => state.transfers);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!transfers.length) {
			dispatch(loadTransfersThunk());
			dispatch(subscribeNewTransferThunk());
			dispatch(subscribeFinishTransferThunk());
		}
	}, [transfers.length, dispatch]);

	useEffect(() => {
		return () => {
			dispatch(resetTransfersAC());
		};
	}, [dispatch]);
	console.log(transfers);
	return { isLoading, transfers };
};
