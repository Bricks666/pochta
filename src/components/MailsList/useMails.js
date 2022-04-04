import { useEffect } from "react";
import { useSelector } from "react-redux";
import { loadMailsThunk, resetMailsThunk } from "../../models/mails";

export const useMails = () => {
	const mails = useSelector((state) => state.mails);

	useEffect(() => {
		loadMailsThunk();

		return () => {
			resetMailsThunk();
		};
	}, []);

	return mails;
};
