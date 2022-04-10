export const toValidUser = (user) => {
	return {
		address: user.Address,
		role: +user.role,
		homeAddress: user.homeAddress,
		name: user.FIO,
		acceptMail: user.acceptMail,
	};
};
