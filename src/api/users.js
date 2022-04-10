import { contract, web3 } from "./core";

export const getAddressesApi = async () => {
	return await web3.eth.getAccounts();
};

export const getUsersAddressesApi = async () => {
	return await contract.methods.getUsers().call();
};

export const upgradeToAdminApi = async (address, user) => {
	await contract.methods.addAdmin(user).send({ from: address });
};

export const upgradeToPostmanApi = async (address, user) => {
	await contract.methods
		.addPostman(user, "hardcode mail id")
		.send({ from: address });
};
