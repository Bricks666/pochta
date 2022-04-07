import { useEffect, useState } from "react";
import { web3 } from "../api/core";

export const useBalance = (address) => {
	const [balance, setBalance] = useState(0);

	useEffect(() => {
		const balance = async () => {
			const balance = await web3.eth.getBalance(address);

			setBalance(balance / 10 ** 18);
		};

		const id = setInterval(() => balance(), 100);

		return () => {
			clearInterval(id);
		};
	}, [address]);

	return balance;
};
