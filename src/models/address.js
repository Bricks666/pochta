import { getAddressesApi, getUsersAddressesApi } from "../api";
import { LOGOUT } from "./auth";

const initialState = {
	isLoading: false,
	addresses: [],
	users: [],
};

const SET_ADDRESS = "address/SET_ADDRESS";
const SET_USERS = "address/SET_USERS";
const TOGGLE_LOADING = "address/TOGGLE_ADDRESS";

export const addressReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_ADDRESS: {
			return {
				...state,
				addresses: payload.addresses,
			};
		}
		case TOGGLE_LOADING: {
			return {
				...state,
				isLoading: payload.isLoading,
			};
		}
		case SET_USERS: {
			return {
				...state,
				users: payload.users,
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

const setAddressAC = (addresses) => {
	return {
		type: SET_ADDRESS,
		payload: {
			addresses,
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

const setUsersAC = (users) => {
	return {
		type: SET_USERS,
		payload: {
			users,
		},
	};
};

export const loadAddressesThunk = () => {
	return async (dispatch) => {
		dispatch(toggleLoadingAC(true));
		const response = await getAddressesApi();
		dispatch(setAddressAC(response));
		dispatch(toggleLoadingAC(false));
	};
};

export const loadUsersThunk = () => {
	return async (dispatch) => {
		dispatch(toggleLoadingAC(true));
		const response = await getUsersAddressesApi();
		dispatch(setUsersAC(response));
		dispatch(toggleLoadingAC(false));
	};
};
