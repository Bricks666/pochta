import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { mailsReducer } from "./mails";
import { userReducer } from "./user";
import { transfersReducer } from "./transfers";
import { authReducer } from "./auth";
import { addressReducer } from "./address";

const rootReducer = combineReducers({
	address: addressReducer,
	auth: authReducer,
	user: userReducer,
	mails: mailsReducer,
	transfers: transfersReducer,
});

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
