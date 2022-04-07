import { mockServerResponse } from "../mocks/mockServerResponse";

/**
 * @type {{isLoading: boolean, info: typeof initialState}}
 */
const initialState = {
	isLoading: false,
	info: { name: "", role: "", address: "" },
};

export const SET_USER = "user/SET_USER";
export const TOGGLE_LOADING = "user/TOGGLE_LOADING";
export const RESET = "user/RESET";

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

const fakeProfile = {
	name: "Fake",
	role: "user",
	address: "asdfasdfasdflkjasdbnabdflns 15",
};

export const loadUserThunk = () => {
	return async (dispatch, getState) => {
		const { address } = getState().auth;
		dispatch(toggleLoadingAC(true));
		const response = await mockServerResponse(fakeProfile);
		dispatch(setUserAC(response));
		dispatch(toggleLoadingAC(false));
	};
};
