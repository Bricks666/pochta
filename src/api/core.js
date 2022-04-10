import Web3 from "web3";
import { abi, address } from "../data";

export let web3 = null;
export let contract = null;

export const initCore = () => {
	web3 = new Web3("ws://127.0.0.1:8545");
	contract = new web3.eth.Contract(abi, address);
};

export const unlockAccount = async (address) => {
	await web3.eth.personal.unlockAccount(address, "0000", 0);
};

export const lockAccount = async (address) => {
	await web3.eth.personal.lockAccount(address);
};

export const subscribe = (event, callback, filter = {}) => {
	return contract.events[event]({ filter }, (error, event) => {
		if (!error) {
			callback(event.returnValues);
		}
	});
};
