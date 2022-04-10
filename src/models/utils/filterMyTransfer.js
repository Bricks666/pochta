export const filterMyTransfers = (transfers, address) => {
	return transfers.filter(
		(transfer) => transfer.sender === address || transfer.receiver === address
	);
};
