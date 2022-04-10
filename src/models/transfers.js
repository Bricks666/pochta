import {
	acceptTransferApi,
	cancelTransferApi,
	getTransfer,
	getTransfersApi,
	sendTransferApi,
} from "../api";
import { subscribe } from "../api/core";
import { toValidTransfer } from "./utils/toValidTransfer";
import { filterMyTransfers } from "./utils/filterMyTransfer";

const transfer = {
	id: 0,
	sender: "",
	receiver: "",
	value: 0,
	lifeTime: "",
	sendAt: "",
	isFinish: false,
};

const initialState = {
	isLoading: false,
	transfers: [],
	unsubscribes: [],
};

const SET_TRANSFERS = "transfers/SET_TRANSFERS";
const ADD_TRANSFER = "transfers/ADD_TRANSFER";
const TOGGLE_LOADING = "transfers/TOGGLE_LOADING";
const FINISH_TRANSFER = "transfers/FINISH_TRANSFER";
const SET_UNSUBSCRIBES = "transfers/SET_UNSUBSCRIBES";
const RESET = "transfers/RESET";

const finishTransfer = (transfers, id) => {
	return transfers.map((transfer) =>
		transfer.id == id ? { ...transfer, isFinish: true } : transfer
	);
};

/**
 *
 * @param {typeof initialState} state
 * @param {{type: string, payload: {}}} action
 * @returns {typeof initialState}
 */
export const transfersReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_TRANSFERS: {
			return {
				...state,
				transfers: payload.transfers,
			};
		}
		case ADD_TRANSFER: {
			const { type, transfer } = payload;
			return {
				...state,
				[type]: [...state[type], transfer],
			};
		}
		case TOGGLE_LOADING: {
			return {
				...state,
				isLoading: payload.isLoading,
			};
		}
		case FINISH_TRANSFER: {
			const { transfers } = state;
			const { transferId } = payload;
			return {
				...state,
				transfers: finishTransfer(transfers, transferId),
			};
		}
		case SET_UNSUBSCRIBES: {
			return {
				...state,
				unsubscribes: [...state.unsubscribes, ...payload.unsubscribes],
			};
		}
		case RESET: {
			state.unsubscribes.forEach((unsubscribe) => unsubscribe.unsubscribe());
			return initialState;
		}
		default: {
			return state;
		}
	}
};

const setTransfersAC = (transfers) => {
	return {
		type: SET_TRANSFERS,
		payload: {
			transfers,
		},
	};
};

const toggleLoadingAC = (isLoading) => {
	return {
		type: TOGGLE_LOADING,
		payload: {
			isLoading,
		},
	};
};

const setUnsubscribesAC = (...unsubscribes) => {
	return {
		type: SET_UNSUBSCRIBES,
		payload: {
			unsubscribes,
		},
	};
};

const finishTransferAC = (transferId) => {
	return {
		type: FINISH_TRANSFER,
		payload: {
			transferId,
		},
	};
};

const addTransferAC = (transfer) => {
	return {
		type: ADD_TRANSFER,
		payload: {
			transfer,
		},
	};
};

export const resetTransfersAC = () => {
	return {
		type: RESET,
	};
};

export const loadTransfersThunk = () => {
	return async (dispatch, getState) => {
		const { address } = getState().auth;
		dispatch(toggleLoadingAC(true));
		const response = await getTransfersApi(address);
		console.log(response);
		dispatch(
			setTransfersAC(filterMyTransfers(response, address).map(toValidTransfer))
		);
		dispatch(toggleLoadingAC(false));
	};
};

export const sendTransferThunk = (receiver, value, liveTime) => {
	return async (_, getState) => {
		const { address } = getState().auth;
		await sendTransferApi(address, receiver, value, liveTime);
	};
};

export const acceptTransferThunk = (id) => {
	return async (_, getState) => {
		const { address } = getState().auth;

		await acceptTransferApi(address, id);
	};
};

export const cancelTransferThunk = (id) => {
	return async (_, getState) => {
		const { address } = getState().auth;

		await cancelTransferApi(address, id);
	};
};

export const subscribeNewTransferThunk = () => {
	return async (dispatch, getState) => {
		const { address } = getState().auth;
		const newSendedTransferSubscribe = subscribe(
			"newTransfer",
			async ({ id }) => {
				const transfer = await getTransfer(id);
				dispatch(addTransferAC(toValidTransfer(transfer)));
			},
			{
				sender: address,
			}
		);
		const newReceivedTransferSubscribe = subscribe(
			"newTransfer",
			async ({ id }) => {
				const transfer = await getTransfer(id);
				dispatch(addTransferAC(toValidTransfer(transfer)));
			},
			{
				receiver: address,
			}
		);

		dispatch(
			setUnsubscribesAC(
				newReceivedTransferSubscribe,
				newSendedTransferSubscribe
			)
		);
	};
};

export const subscribeFinishTransferThunk = () => {
	return async (dispatch, getState) => {
		const { address } = getState().auth;
		const finishAsSenderTransferSubscribe = subscribe(
			"finishTransfer",
			({ id }) => dispatch(finishTransferAC(id)),
			{ sender: address }
		);
		const finishAsReceiverTransferSubscribe = subscribe(
			"finishTransfer",
			({ id }) => dispatch(finishTransferAC(id)),
			{ receiver: address }
		);
		dispatch(
			setUnsubscribesAC(
				finishAsSenderTransferSubscribe,
				finishAsReceiverTransferSubscribe
			)
		);
	};
};
