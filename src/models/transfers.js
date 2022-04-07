import {
	acceptTransferApi,
	cancelTransferApi,
	getTransfersApi,
	sendTransferApi,
} from "../api";
import { toValidTransfer } from "./utils/toValidTransfer";

const transfer = {
	id: 0,
	sender: "",
	receiver: "",
	value: 0,
	lifeTime: "",
	sendAt: "",
	isFinish: false,
};

/**
 * @type {{isLoading: boolean, transfers: Array<typeof transfer>}}
 */
const initialState = {
	isLoading: false,
	transfers: [],
};

const SET_TRANSFERS = "transfers/SET_TRANSFERS";
const TOGGLE_LOADING = "transfers/TOGGLE_LOADING";

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
		case TOGGLE_LOADING: {
			return {
				...state,
				isLoading: payload.isLoading,
			};
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

export const loadTransfersThunk = () => {
	return async (dispatch, getState) => {
		const { address } = getState().auth;
		dispatch(toggleLoadingAC(true));
		const response = await getTransfersApi(address);
		dispatch(setTransfersAC(response.map(toValidTransfer)));
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
