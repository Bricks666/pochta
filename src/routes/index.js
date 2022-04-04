import { LoginPage, MailsPage, ProfilePage, RegistrationPage } from "../pages";

export const PATHS = {
	login: "login",
	registration: "registration",
	profile: "profile",
	mails: "mails",
};

export const routes = [
	{
		Component: LoginPage,
		path: PATHS.login,
	},
	{
		Component: RegistrationPage,
		path: PATHS.registration,
	},
	{
		Component: ProfilePage,
		path: PATHS.profile,
	},
	{
		Component: MailsPage,
		path: PATHS.mails,
	},
];
