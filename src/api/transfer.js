import { contract } from "./core";

export const getTransfersApi = async () => {
	return await contract.methods.getTransfers().call();
};

export const getTransfer = async (id) => {
	return await contract.methods.transfers(id).call();
};

export const sendTransferApi = async (address, receiver, value, liveTime) => {
	await contract.methods
		.createTransfer(receiver, liveTime)
		.send({ from: address, value: value * 10 ** 18 });
};

export const acceptTransferApi = async (address, id) => {
	return await contract.methods.acceptTransfer(id).send({ from: address });
};

export const cancelTransferApi = async (address, id) => {
	return await contract.methods.cancelTransfer(id).send({ from: address });
};
