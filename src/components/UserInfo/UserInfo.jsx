import { ListGroup } from "react-bootstrap";
import { ROLE_NAME } from "../../consts";

export const UserInfo = ({ name, role, homeAddress, children }) => {
	return (
		<ListGroup as="dl">
			<ListGroup.Item as="dt">Имя</ListGroup.Item>
			<ListGroup.Item as="dd">{name}</ListGroup.Item>
			<ListGroup.Item as="dt">Роль</ListGroup.Item>
			<ListGroup.Item as="dd">{ROLE_NAME[role]}</ListGroup.Item>
			<ListGroup.Item as="dt">Адрес</ListGroup.Item>
			<ListGroup.Item as="dd">{homeAddress}</ListGroup.Item>
			{children}
		</ListGroup>
	);
};
