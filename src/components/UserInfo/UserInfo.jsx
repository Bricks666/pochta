import { Container, ListGroup, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROLE_NAME } from "../../consts";
import { useBalance, useUser } from "../../hooks";
import { toEth } from "../../utils";

export const UserInfo = () => {
	const { info, isLoading } = useUser();
	const balance = useBalance(info.name);
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
						<ListGroup.Item as="dd">{ROLE_NAME[info.role]}</ListGroup.Item>
						<ListGroup.Item as="dt">Адрес</ListGroup.Item>
						<ListGroup.Item as="dd">{info.address}</ListGroup.Item>
						<ListGroup.Item as="dt">Баланс</ListGroup.Item>
						<ListGroup.Item as="dd">{toEth(balance)} ETH</ListGroup.Item>
					</ListGroup>
					<Button as={Link} to="change">
						Изменить профиль
					</Button>
				</>
			)}
		</Container>
	);
};
