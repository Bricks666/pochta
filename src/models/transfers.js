import { mockServerResponse } from "../mocks";

const transfer = {
	sender: "",
	receiver: "",
	sum: 0,
	lifeTime: "",
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
	return async (dispatch) => {
		dispatch(toggleLoadingAC(true));
		const response = await mockServerResponse([]);
		dispatch(setTransfersAC(response));
		dispatch(toggleLoadingAC(false));
	};
};
