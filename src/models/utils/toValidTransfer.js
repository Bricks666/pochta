export const toValidTransfer = (transfer) => {
	return {
		id: transfer.id,
		sender: transfer.sender,
		receiver: transfer.recipient,
		value: transfer.value,
		sendAt: transfer.timeSend,
		liveTime: transfer.liveTime,
		isFinish: transfer.isFinish,
	};
};
