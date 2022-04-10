import { toEth } from "../../utils";

export const toValidTransfer = (transfer) => {
	return {
		id: transfer.id,
		sender: transfer.sender,
		receiver: transfer.receiver,
		value: toEth(transfer.value),
		sendAt: transfer.timeSend,
		liveTime: transfer.liveTime,
		isFinish: transfer.isFinish,
	};
};
