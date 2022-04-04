import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { mailsReducer } from "./mails";
import { userReducer } from "./user";

const rootReducer = combineReducers({
	user: userReducer,
	mails: mailsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
