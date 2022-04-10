import { PRECISION } from "../../consts";

export const toValidMail = (mail) => {
	const { id, trackNumber, status, personalData, packageType, delivery } = mail;
	return {
		id: id,
		track: trackNumber,
		sender: personalData.sender,
		receiver: personalData.receiver,
		senderAddress: personalData.addressSender,
		receiverAddress: personalData.addressReceiver,
		packageType: +packageType.typePackage,
		packageClass: +packageType.packageClass,
		weight: delivery.weight / 10 ** PRECISION,
		deliveryPrice: delivery.deliveryPrice / 10 ** PRECISION,
		valuePackage: +delivery.valuePackage,
		deliveryTime: +delivery.deliveryTime,
		allPrice: delivery.allPrice / 10 ** PRECISION,
		status: +status,
	};
};
