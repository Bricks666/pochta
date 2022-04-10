import { useEffect, useState } from "react";
import { web3 } from "../api/core";

export const useBalance = (address) => {
	const [balance, setBalance] = useState(0);

	useEffect(() => {
		const balance = async () => {
			const balance = address ? await web3.eth.getBalance(address) : 0;

			setBalance(balance);
		};

		const id = setInterval(() => balance(), 100);

		return () => {
			clearInterval(id);
		};
	}, [address]);

	return balance;
};
