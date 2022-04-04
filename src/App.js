import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

export const App = () => {
	return (
		<div>
			<Routes>
				{routes.map(({ Component, path }) => (
					<Route path={path} element={<Component />} />
				))}
			</Routes>
		</div>
	);
};
