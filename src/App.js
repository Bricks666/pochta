import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Navigation } from "./components/Navigation";
import { AuthRoute } from "./components/AuthRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { initThunk } from "./models/init";

export const App = () => {
	const dispatch = useDispatch();
	const isInitializing = useSelector((state) => state.init.isInitializing);
	useEffect(() => {
		dispatch(initThunk());
	}, [dispatch]);
	return (
		<div>
			{isInitializing ? (
				<Spinner />
			) : (
				<>
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
				</>
			)}
		</div>
	);
};
