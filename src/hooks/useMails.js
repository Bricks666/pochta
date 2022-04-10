import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	loadMailsThunk,
	subscribeChangeStatusMailThunk,
	subscribeNewMailThunk,
} from "../models/mails";

export const useMails = () => {
	const mails = useSelector((state) => state.mails);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!mails.mails.length) {
			dispatch(loadMailsThunk());
			dispatch(subscribeNewMailThunk());
			dispatch(subscribeChangeStatusMailThunk());
		}
	}, [dispatch, mails.mails.length]);

	return mails;
};
