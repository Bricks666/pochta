import {
	getUserApi,
	getUsersAddressesApi,
	upgradeToAdminApi,
	upgradeToPostmanApi,
} from "../api";
import { subscribe } from "../api/core";
import { toValidUser } from "./utils/toValidUser";

const initialState = {
	isLoading: false,
	users: [],
	unsubscribes: [],
};

const SET_USERS = "users/SET_USERS";
const TOGGLE_LOADING = "users/TOGGLE_LOADING";
const ADD_USER = "users/ADD_USER";
const CHANGE_USER_INFO = "users/CHANGE_USER_INFO";
const SET_UNSUBSCRIBES = "users/SET_UNSUBSCRIBES";
const RESET = "users/RESET";

export const usersReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_USERS: {
			return {
				...state,
				users: payload.users,
			};
		}
		case TOGGLE_LOADING: {
			return {
				...state,
				isLoading: payload.isLoading,
			};
		}
		case ADD_USER: {
			return {
				...state,
				users: [...state.users, payload.user],
			};
		}
		case CHANGE_USER_INFO: {
			const { info, address } = payload;
			return {
				...state,
				users: state.users.map((user) =>
					user.address === address ? info : user
				),
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

const setUsersAC = (users) => {
	return {
		type: SET_USERS,
		payload: {
			users,
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
const addUserAC = (user) => {
	return {
		type: ADD_USER,
		payload: {
			user,
		},
	};
};
const changeUserInfoAC = (address, info) => {
	return {
		type: CHANGE_USER_INFO,
		payload: {
			address,
			info,
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
export const resetUsersAC = () => {
	return {
		type: RESET,
	};
};

export const loadUsersThunk = () => {
	return async (dispatch) => {
		dispatch(toggleLoadingAC(true));
		const addresses = await getUsersAddressesApi();
		const users = await Promise.all(
			addresses.map((address) => getUserApi(address))
		);
		dispatch(setUsersAC(users.map(toValidUser)));
		dispatch(toggleLoadingAC(false));
	};
};

export const subscribeNewUserThunk = () => {
	return async (dispatch) => {
		const newUserSubscribe = subscribe("newUser", async ({ user: address }) => {
			const user = await getUserApi(address);
			dispatch(addUserAC(toValidUser(user)));
		});

		dispatch(setUnsubscribesAC(newUserSubscribe));
	};
};

export const subscribeChangeInfoThunk = () => {
	return async (dispatch) => {
		const changeInfoSubscribe = subscribe(
			"changeInfo",
			async ({ user: address }) => {
				const user = await getUserApi(address);
				dispatch(changeUserInfoAC(address, user));
			}
		);

		dispatch(setUnsubscribesAC(changeInfoSubscribe));
	};
};

export const upgradeToAdminThunk = (user) => {
	return async (_, getState) => {
		const { address } = getState().auth;
		await upgradeToAdminApi(address, user);
	};
};

export const upgradeToPostmanThunk = (user) => {
	return async (_, getState) => {
		const { address } = getState().auth;
		await upgradeToPostmanApi(address, user);
	};
};
