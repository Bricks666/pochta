import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }) => {
	const isAuth = useSelector((state) => state.auth.isAuth);

	if (!isAuth) {
		return <Navigate to="login" replace={true} />;
	}

	return children;
};
