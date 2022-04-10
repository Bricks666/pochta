import { contract } from "./core";

export const getUserApi = async (address) => {
	return await contract.methods.users(address).call();
};

export const changeInfoApi = async (address, homeAddress, fio, acceptMail) => {
	await contract.methods
		.changeUserInfo(homeAddress, fio, acceptMail)
		.send({ from: address });
};
