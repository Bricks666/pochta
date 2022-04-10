import { Container, ListGroup, Spinner } from "react-bootstrap";
import { UserCard } from "./UserCard";
import { useUsers } from "./useUsers";

export const UsersList = () => {
	const { isLoading, users } = useUsers();
	return (
		<Container>
			{isLoading ? (
				<Spinner />
			) : (
				<ListGroup>
					{users.map((user) => (
						<UserCard info={user} key={user.address} />
					))}
				</ListGroup>
			)}
		</Container>
	);
};
