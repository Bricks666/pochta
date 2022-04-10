import { PRECISION } from "../consts";
import { toWie } from "../utils";
import { contract } from "./core";

export const getMailsApi = async () => {
	return await contract.methods.getPackages().call();
};
export const getMailApi = async (id) => {
	return await contract.methods.packages(id).call();
};
export const sendMailApi = async (
	address,
	{
		sender,
		receiver,
		typePackage,
		packageClass,
		weight,
		deliveryPrice,
		deliveryTime,
		allPrice,
		valuePackage,
	}
) => {
	await contract.methods
		.addPackage(
			{ sender, receiver },
			{ typePackage, packageClass },
			{
				deliveryTime,
				valuePackage,
				weight: weight * 10 ** PRECISION,
				deliveryPrice: deliveryPrice * 10 ** PRECISION,
				allPrice: allPrice * 10 ** PRECISION,
			}
		)
		.send({ from: address });
};

export const acceptMailApi = async (address, id) => {
	await contract.methods.acceptPackage(id).send({ from: address });
};

export const payMailApi = async (address, id, price) => {
	await contract.methods
		.payPackage(id)
		.send({ from: address, value: toWie(price) });
};
export const cancelMailApi = async (address, id) => {
	await contract.methods.cancelPackage(id).send({ from: address });
};
