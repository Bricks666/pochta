import Web3 from "web3";
import { loginApi, registrationApi } from "../api";

const initialState = {
	address: "",
	loginError: null,
	registrationError: null,
	isAuth: false,
};

const SET_AUTH = "auth/SET_AUTH";
const SET_LOGIN_ERROR = "auth/SET_LOGIN_ERROR";
const SET_REGISTRATION_ERROR = "auth/SET_REGISTRATION_ERROR";
const TOGGLE_AUTHORIZING = "auth/TOGGLE_AUTHORIZING";
export const LOGOUT = "auth/LOGOUT";

/**
 * @param {typeof initialState} state
 * @param {{type: string, payload: {}}} param1
 * @returns {typeof initialState}
 */
export const authReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_AUTH: {
			return {
				state,
				address: payload.address,
				isAuth: true,
			};
		}
		case SET_LOGIN_ERROR: {
			return {
				...state,
				loginError: payload.loginError,
			};
		}
		case SET_REGISTRATION_ERROR: {
			return {
				...state,
				registrationError: payload.registrationError,
			};
		}
		case TOGGLE_AUTHORIZING: {
			return {
				...state,
				isAuthorizing: payload.isAuthorizing,
			};
		}
		case LOGOUT: {
			return initialState;
		}
		default: {
			return state;
		}
	}
};

const setAuthAC = (address) => {
	return {
		type: SET_AUTH,
		payload: {
			address,
		},
	};
};

const setLoginErrorAC = (loginError) => {
	return {
		type: SET_LOGIN_ERROR,
		payload: {
			loginError,
		},
	};
};

const setRegistrationErrorAC = (registrationError) => {
	return {
		type: SET_REGISTRATION_ERROR,
		payload: {
			registrationError,
		},
	};
};

export const loginThunk = (address) => {
	return async (dispatch) => {
		try {
			const user = await loginApi(address);
			if (Web3.utils.hexToNumberString(user.Address) === "0") {
				throw new Error();
			}
			dispatch(setAuthAC(address));
			dispatch(setLoginErrorAC(null));
			return true;
		} catch (e) {
			dispatch(setLoginErrorAC("Пользователь не зарегистрирован"));
		}
	};
};

export const registrationThunk = (login, address, fio) => {
	return async (dispatch) => {
		try {
			await registrationApi(login, address, fio);
			dispatch(setRegistrationErrorAC(null));
			return true;
		} catch (e) {
			dispatch(setRegistrationErrorAC("Пользователь уже зарегистрирован"));
		}
	};
};
