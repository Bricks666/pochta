import { Container } from "react-bootstrap";
import { UsersList } from "../components/UsersList";

export const UsersPage = () => {
	return (
		<Container>
			<h2>Пользователи</h2>
			<UsersList />
		</Container>
	);
};
