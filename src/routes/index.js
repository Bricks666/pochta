import { Navigate } from "react-router-dom";
import {
	LoginPage,
	MailsPage,
	ProfilePage,
	RegistrationPage,
	TransfersPage,
} from "../pages";
import { UsersPage } from "../pages/UsersPage";

export const routes = [
	{
		Component: LoginPage,
		path: "login",
	},
	{
		Component: RegistrationPage,
		path: "registration",
	},
	{
		Component: ProfilePage,
		path: "profile/*",
		isOnlyAuth: true,
	},
	{
		Component: MailsPage,
		path: "mails/*",
		isOnlyAuth: true,
	},
	{
		Component: TransfersPage,
		path: "transfers/*",
		isOnlyAuth: true,
	},
	{
		Component: UsersPage,
		path: "users/*",
		isOnlyAuth: true,
	},
	{
		Component: () => <Navigate to="profile" />,
		path: "*",
	},
];
