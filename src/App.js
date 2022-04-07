import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Navigation } from "./components/Navigation";
import { AuthRoute } from "./components/AuthRoute";

export const App = () => {
	return (
		<div>
			<Routes>
				<Route path="login" element={null} />
				<Route path="registration" element={null} />
				<Route path="*" element={<Navigation />} />
			</Routes>
			<Routes>
				{routes.map(({ Component, path, isOnlyAuth }) => (
					<Route
						path={path}
						element={
							isOnlyAuth ? (
								<AuthRoute>
									<Component />
								</AuthRoute>
							) : (
								<Component />
							)
						}
						key={path}
					/>
				))}
			</Routes>
		</div>
	);
};
