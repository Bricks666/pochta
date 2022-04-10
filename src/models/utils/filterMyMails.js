import { PACKAGE_STATUS } from "../../consts";

export const filterMyMails = (mails, address) => {
	console.log(mails);
	return mails.filter(
		({ personalData, status }) =>
			personalData.sender === address ||
			(personalData.receiver === address &&
				+status !== PACKAGE_STATUS.WAIT_FOR_PAY)
	);
};
