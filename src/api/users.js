import { contract, web3 } from "./core";

export const getAddressesApi = async () => {
	return await web3.eth.getAccounts();
};

export const getUsersApi = async () => {
	return await contract.methods.getUsers().call();
};
