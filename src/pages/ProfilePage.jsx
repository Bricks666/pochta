import { Container } from "react-bootstrap";
import { UserInfo } from "../components/UserInfo";

export const ProfilePage = () => {
	return (
		<main>
			<Container>
				<h2>Профиль</h2>
				<UserInfo />
			</Container>
		</main>
	);
};
