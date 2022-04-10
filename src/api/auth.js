import { contract, lockAccount, unlockAccount } from "./core";

export const loginApi = async (address) => {
	await unlockAccount(address);
	const user = await contract.methods.getUser(address).call();

	return user;
};

export const registrationApi = async (address, homeAddress, fio) => {
	await unlockAccount(address);
	await contract.methods.registration(homeAddress, fio).send({ from: address });
};

export const logoutApi = async (address) => {
	await lockAccount(address);
};
