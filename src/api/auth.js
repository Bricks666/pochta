import { contract, lockAccount, unlockAccount } from "./core";

export const loginApi = async (address) => {
	await unlockAccount(address);
	const user = await contract.methods.Users(address).call();
	debugger;

	return user;
};

export const registrationApi = async (address, homeAddress, fio) => {
	await unlockAccount(address);
	await contract.methods.registration(homeAddress, fio).call({ from: address });
};

export const logoutApi = async (address) => {
	await lockAccount(address);
};
