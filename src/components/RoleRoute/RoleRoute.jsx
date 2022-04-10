import { Navigate } from "react-router-dom";
import { useUser } from "../../hooks";

export const RoleRoute = ({ roles, children }) => {
	const {
		info: { role },
	} = useUser();

	if (!roles.includes(role)) {
		return <Navigate to={-1} replace={true} />;
	}

	return children;
};
