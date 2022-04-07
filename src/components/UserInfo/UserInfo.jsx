import { Container, ListGroup, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { roleMap } from "../../consts";
import { useUser } from "../../hooks";

export const UserInfo = () => {
	const { info, isLoading } = useUser();
	return (
		<Container>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<h3>Информация</h3>
					<ListGroup as="dl">
						<ListGroup.Item as="dt">Имя</ListGroup.Item>
						<ListGroup.Item as="dd">{info.name}</ListGroup.Item>
						<ListGroup.Item as="dt">Роль</ListGroup.Item>
						<ListGroup.Item as="dd">{roleMap[info.role]}</ListGroup.Item>
						<ListGroup.Item as="dt">Адрес</ListGroup.Item>
						<ListGroup.Item as="dd">{info.address}</ListGroup.Item>
					</ListGroup>
					<Button as={Link} to="change">
						Изменить профиль
					</Button>
				</>
			)}
		</Container>
	);
};
