import { contract } from "./core";

export const getUserApi = async (address) => {
	return await contract.methods.User(address).call();
};

export const changeInfoApi = async (address, homeAddress, fio) => {
	await contract.methods.changeHomeAddress(homeAddress).send({ from: address });
	await contract.methods.changeFIO(fio).send({ from: address });
};

export const toggleAcceptMailApi = async (address) => {
	await contract.methods.againstAcceptMail().send({ from: address });
};
