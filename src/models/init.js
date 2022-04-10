import { initCore } from "../api/core";

const initialState = {
	isInitializing: true,
};

const TOGGLE_INITIALIZING = "init/TOGGLE_INITIALIZING";

export const initReducer = (state = initialState, { type, payload }) => {
	if (type === TOGGLE_INITIALIZING) {
		return {
			...state,
			isInitializing: payload.isInitializing,
		};
	}

	return state;
};

const toggleInitializingAC = (isInitializing) => {
	return {
		type: TOGGLE_INITIALIZING,
		payload: {
			isInitializing,
		},
	};
};

export const initThunk = () => {
	return async (dispatch) => {
		dispatch(toggleInitializingAC(true));
		await initCore();
		dispatch(toggleInitializingAC(false));
	};
};
