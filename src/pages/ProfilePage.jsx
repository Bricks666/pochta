import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { ProfileInfo } from "../components/ProfileInfo";
import { ChangeProfileInfo } from "../components/ChangeProfileInfo";

export const ProfilePage = () => {
	return (
		<main>
			<Container>
				<h2>Профиль</h2>
				<Routes>
					<Route path="change" element={<ChangeProfileInfo />} />
					<Route path="*" element={<ProfileInfo />} />
				</Routes>
			</Container>
		</main>
	);
};
