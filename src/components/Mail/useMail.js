import { useMails } from "../../hooks/useMails";

export const useMail = (track) => {
	const { mails } = useMails();

	return mails.find((mail) => mail.track === track) || null;
};
