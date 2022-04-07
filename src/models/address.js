import { mockServerResponse } from "../mocks/mockServerResponse";

const initialState = {
	isLoading: false,
	addresses: [],
};

const SET_ADDRESS = "address/SET_ADDRESS";
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

export const loadAddressesThunk = () => {
	return async (dispatch) => {
		dispatch(toggleLoadingAC(true));
		const response = await mockServerResponse([]);
		dispatch(setAddressAC(response));
		dispatch(toggleLoadingAC(false));
	};
};
