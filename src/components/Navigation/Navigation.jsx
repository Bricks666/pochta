import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const navigation = [
	{
		path: "profile",
		label: "Профиль",
	},
	{
		path: "mails",
		label: "Отправления",
	},
	{
		path: "transfers",
		label: "Денежные переводы",
	},
];

export const Navigation = () => {
	return (
		<Container>
			<Navbar bg="primary" variant="dark">
				<Container>
					<Navbar.Brand>Ростовская государственная почта</Navbar.Brand>
					<Nav>
						{navigation.map(({ path, label }) => (
							<Nav.Link as={Link} to={path}>
								{label}
							</Nav.Link>
						))}
					</Nav>
				</Container>
			</Navbar>
		</Container>
	);
};
