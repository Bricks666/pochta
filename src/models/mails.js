import { PACKAGE_CLASS, PACKAGE_TYPE } from "../consts";
import {
	acceptMailApi,
	getMailApi,
	getMailsApi,
	sendMailApi,
	payMailApi,
	cancelMailApi,
} from "../api";
import { filterMyMails } from "./utils/filterMyMails";
import { toValidMail } from "./utils/toValidMail";
import { subscribe } from "../api/core";

const mail = {
	id: 0,
	track: "",
	sender: "",
	senderAddress: "",
	receiver: "",
	receiverAddress: "",
	packageType: PACKAGE_TYPE.LETTER,
	packageClass: PACKAGE_CLASS.FIRST,
	weight: 0,
	deliveryPrice: 0,
	valuePackage: 0,
	deliveryTime: 0,
	allPrice: 0,
	status: 0,
};

const SET_MAILS = "mails/SET_MAILS";
const ADD_MAIL = "mails/ADD_MAIL";
const CHANGE_STATUS_MAIL = "mails/CHANGE_STATUS_MAIL";
const TOGGLE_LOADING = "mails/TOGGLE_LOADING";
const SET_UNSUBSCRIBES = "mails/SET_UNSUBSCRIBES";
const RESET = "mails/RESET";

/**
 * @type {{isLoading: boolean, mails: Array<typeof mail>, unsubscribes: Array<Function>}}
 */
const initialState = {
	isLoading: false,
	mails: [],
	unsubscribes: [],
};

/**
 *
 * @param {typeof initialState} state
 * @param {{type: string, payload: {}}} action
 * @returns {typeof initialState}
 *
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
		case ADD_MAIL: {
			return {
				...state,
				mails: [...state.mails, payload.mail],
			};
		}
		case CHANGE_STATUS_MAIL: {
			return {
				...state,
				mails: state.mails.map((mail) =>
					mail.id === payload.mailId
						? { ...mail, status: payload.newStatus }
						: mail
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

const addMailAC = (mail) => {
	return {
		type: ADD_MAIL,
		payload: {
			mail,
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

const changeStatusMailAC = (mailId, newStatus) => {
	return {
		type: CHANGE_STATUS_MAIL,
		payload: {
			mailId,
			newStatus,
		},
	};
};

export const resetMailsAC = () => {
	return {
		type: RESET,
	};
};

export const loadMailsThunk = () => {
	return async (dispatch, getState) => {
		const { address } = getState().auth;
		dispatch(toggleLoadingAC(true));
		const response = await getMailsApi();
		dispatch(setMailsAC(filterMyMails(response, address).map(toValidMail)));
		dispatch(toggleLoadingAC(false));
	};
};

export const sendMailThunk = (preMail) => {
	return async (_, getState) => {
		const { address } = getState().auth;
		await sendMailApi(address, preMail);
	};
};

export const subscribeNewMailThunk = () => {
	return async (dispatch, getState) => {
		const { address } = getState().auth;
		const newSendedMailSubscribe = subscribe(
			"newPackage",
			async ({ id }) => {
				const mail = await getMailApi(id);
				dispatch(addMailAC(toValidMail(mail)));
			},
			{ sender: address }
		);
		const newReceivedMailSubscribe = subscribe(
			"newPackage",
			async ({ id }) => {
				const mail = await getMailApi(id);
				dispatch(addMailAC(toValidMail(mail)));
			},
			{ receiver: address }
		);
		dispatch(
			setUnsubscribesAC(newSendedMailSubscribe, newReceivedMailSubscribe)
		);
	};
};

export const subscribeChangeStatusMailThunk = () => {
	return async (dispatch, getState) => {
		const { address } = getState().auth;

		const finishMailAsSenderSubscribe = subscribe(
			"changePackageStatus",
			({ id, newStatus }) => dispatch(changeStatusMailAC(id, newStatus)),
			{ sender: address }
		);
		const finishMailAsReceiverSubscribe = subscribe(
			"changePackageStatus",
			({ id, newStatus }) => dispatch(changeStatusMailAC(id, newStatus)),
			{ receiver: address }
		);

		dispatch(
			setUnsubscribesAC(
				finishMailAsReceiverSubscribe,
				finishMailAsSenderSubscribe
			)
		);
	};
};

export const acceptMailThunk = (id) => {
	return async (_, getState) => {
		const { address } = getState().auth;
		await acceptMailApi(address, id);
	};
};

export const payMailThunk = (id, price) => {
	return async (_, getState) => {
		const { address } = getState().auth;
		await payMailApi(address, id, price);
	};
};

export const cancelMailThunk = (id) => {
	return async (_, getState) => {
		const { address } = getState().auth;
		await cancelMailApi(address, id);
	};
};
