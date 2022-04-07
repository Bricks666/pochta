import { mockServerResponse } from "../mocks/mockServerResponse";

const mail = {
	track: "asdasdf",
	sender: "adfasdf",
	receiver: "asdfasdf",
	type: "adfasdffasdf",
	category: 3,
	duration: 10,
	coast: 12,
	weight: 1,
	declaredCoast: 13,
	totalCoast: 2,
	senderAddress: "adfasdf",
	receiverAddress: "adsfasdf",
};

export const SET_MAILS = "mails/SET_MAILS";
export const TOGGLE_LOADING = "mails/TOGGLE_LOADING";
export const RESET = "mails/RESET";

/**
 * @type {{isLoading: boolean, mails: Array<typeof mail>}}
 */
const initialState = {
	isLoading: false,
	mails: [],
};

/**
 *
 * @param {typeof initialState} state
 * @param {{type: string, payload: {}}} action
 */
export const mailsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_MAILS: {
			return {
				...state,
				mails: payload.mails,
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

const setMailsAC = (mails) => {
	return {
		type: SET_MAILS,
		payload: {
			mails,
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

const resetMailsAC = () => {
	return {
		type: RESET,
	};
};

export const loadMailsThunk = () => {
	return async (dispatch) => {
		dispatch(toggleLoadingAC(true));
		const response = await mockServerResponse([mail]);
		dispatch(setMailsAC(response));
		dispatch(toggleLoadingAC(false));
	};
};

export const resetMailsThunk = () => {
	return async (dispatch) => {
		dispatch(resetMailsAC());
	};
};
