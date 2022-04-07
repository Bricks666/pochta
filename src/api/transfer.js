import { contract } from "./core";

export const getTransfersApi = async (address) => {
	return [];
};

export const sendTransferApi = async (address, receiver, value, liveTime) => {
	await contract.methods
		.moneyTransfer(receiver, liveTime)
		.send({ from: address, value: value * 10 ** 18 });
};

export const acceptTransferApi = async (address, id) => {
	return await contract.methods.acceptTrancfer(id).send({ from: address });
};

export const cancelTransferApi = async (address, id) => {
	return await contract.methods.cancelTransfer(id).send({ from: address });
};
