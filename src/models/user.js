import { toggleAcceptMailApi, getUserApi, changeInfoApi } from "../api";
import { toValidUser } from "./utils/toValidUser";

/**
 * @type {{isLoading: boolean, info: typeof initialState}}
 */
const initialState = {
	isLoading: false,
	info: { name: "", role: 0, address: "", fio: "", acceptMail: false },
};

const SET_USER = "user/SET_USER";
const CHANGE_INFO = "user/CHANGE_INFO";
const TOGGLE_ACCEPT_MAIl = "user/TOGGLE_ACCEPT_MAIl";
const TOGGLE_LOADING = "user/TOGGLE_LOADING";
const RESET = "user/RESET";

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
		case CHANGE_INFO: {
			return {
				...state,
				address: payload.address,
				fio: payload.fio,
			};
		}
		case TOGGLE_ACCEPT_MAIl: {
			return {
				...state,
				acceptMail: !state.acceptMail,
			};
		}
		case RESET: {
			return initialState;
		}
		default: {
			return state;
		}
	}
};

/**
 *
 * @param {typeof initialState} user
 * @returns
 */
const setUserAC = (user) => {
	return {
		type: SET_USER,
		payload: {
			user,
		},
	};
};

const changeInfoAC = (address, fio) => {
	return {
		type: CHANGE_INFO,
		payload: {
			address,
			fio,
		},
	};
};

const toggleAcceptMailAC = () => {
	return {
		type: TOGGLE_ACCEPT_MAIl,
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

export const resetUserAC = () => {
	return {
		type: RESET,
	};
};

export const loadUserThunk = () => {
	return async (dispatch, getState) => {
		const { address } = getState().auth;
		dispatch(toggleLoadingAC(true));
		const response = getUserApi(address);
		dispatch(setUserAC(toValidUser(response)));
		dispatch(toggleLoadingAC(false));
	};
};

export const changeInfoThunk = (homeAddress, fio) => {
	return async (dispatch, getState) => {
		const { address } = getState().auth;
		dispatch(toggleLoadingAC(true));
		await changeInfoApi(address, homeAddress, fio);
		dispatch(changeInfoAC(homeAddress, fio));
		dispatch(toggleLoadingAC(false));
	};
};

export const toggleAcceptMailThunk = () => {
	return async (dispatch, getState) => {
		const { address } = getState().auth;
		await toggleAcceptMailApi(address);
		dispatch(toggleAcceptMailAC());
	};
};
