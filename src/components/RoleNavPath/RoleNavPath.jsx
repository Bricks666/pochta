import { useUser } from "../../hooks";

export const RoleNavPath = ({ roles, children }) => {
	const {
		info: { role },
	} = useUser();
	if (!roles.includes(role)) {
		return null;
	}
	return children;
};
