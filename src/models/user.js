import { getUserApi, changeInfoApi } from "../api";
import { subscribe } from "../api/core";
import { toValidUser } from "./utils/toValidUser";

/**
 * @type {{isLoading: boolean, info: typeof initialState}}
 */
const initialState = {
	isLoading: false,
	info: { name: "", role: 0, address: "", fio: "", acceptMail: false },
	unsubscribe: null,
};

const SET_USER = "user/SET_USER";
const TOGGLE_LOADING = "user/TOGGLE_LOADING";
const RESET = "user/RESET";
const SET_UNSUBSCRIBE = "user/SET_UNSUBSCRIBE";

/**
 *
 * @param {typeof initialState} state
 * @param {ReturnType<typeof setUserAC | typeof toggleLoadingAC | typeof resetUserAC>} action
 * @returns
 */
export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_USER: {
			return {
				...state,
				info: payload.user,
			};
		}
		case TOGGLE_LOADING: {
			return {
				...state,
				isLoading: payload.isLoading,
			};
		}
		case SET_UNSUBSCRIBE: {
			return {
				...state,
				unsubscribe: payload.unsubscribe,
			};
		}
		case RESET: {
			state.unsubscribe.unsubscribe();
			return initialState;
		}
		default: {
			return state;
		}
	}
};

const setUserAC = (user) => {
	return {
		type: SET_USER,
		payload: {
			user,
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

const setUnsubscribeAC = (unsubscribe) => {
	return {
		type: SET_UNSUBSCRIBE,
		payload: {
			unsubscribe,
		},
	};
};

export const resetUserAC = () => {
	return {
		type: RESET,
	};
};

export const loadUserThunk = () => {
	return async (dispatch, getState) => {
		const { address } = getState().auth;
		dispatch(toggleLoadingAC(true));
		const response = await getUserApi(address);
		dispatch(setUserAC(toValidUser(response)));
		dispatch(toggleLoadingAC(false));
	};
};

export const changeInfoThunk = (homeAddress, fio, acceptMail) => {
	return async (_, getState) => {
		const { address } = getState().auth;
		await changeInfoApi(address, homeAddress, fio, acceptMail);
	};
};

export const subscribeChangeIno = () => {
	return async (dispatch, getState) => {
		const { address } = getState().auth;
		const unsubscribe = subscribe(
			"changeInfo",
			(user) => dispatch(setUserAC(toValidUser(user))),
			{ user: address }
		);
		dispatch(setUnsubscribeAC(unsubscribe));
	};
};
