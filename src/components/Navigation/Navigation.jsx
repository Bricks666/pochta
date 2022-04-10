import { useCallback } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ROLES } from "../../consts";
import { logoutAC } from "../../models/auth";
import { RoleNavPath } from "../RoleNavPath";

const navigation = [
	{
		path: "profile",
		label: "Профиль",
	},
	{
		label: "Отправления",
		path: [
			{
				path: "mails/all",
				label: "История отправлений",
			},
			{
				path: "mails/add",
				label: "Добавить отправление",
				roles: [ROLES.POSTMAN],
			},
		],
	},
	{
		path: "transfers",
		label: "Денежные переводы",
	},
	{
		label: "Пользователи",
		path: "users",
		roles: [ROLES.ADMIN, ROLES.MAIN_ADMIN],
	},
];

export const Navigation = () => {
	const dispatch = useDispatch();
	const logout = useCallback(() => dispatch(logoutAC()), [dispatch]);

	return (
		<Container>
			<Navbar bg="primary" variant="dark">
				<Container>
					<Navbar.Brand>Ростовская государственная почта</Navbar.Brand>
					<Nav>
						{navigation.map((navigation) => (
							<NavigationItem {...navigation} key={navigation.label} />
						))}
					</Nav>
					<Button onClick={logout}>Выйти</Button>
				</Container>
			</Navbar>
		</Container>
	);
};

const NavigationItem = ({ path, label, roles }) => {
	const item =
		typeof path === "string" ? (
			<Nav.Link as={Link} to={path}>
				<Nav.Item>{label}</Nav.Item>
			</Nav.Link>
		) : (
			<NavDropdown title={label}>
				{path.map(({ path, label, roles }) => {
					const item = (
						<NavDropdown.Item to={path} as={Link} key={path}>
							{label}
						</NavDropdown.Item>
					);

					return roles ? <RoleNavPath roles={roles}>{item}</RoleNavPath> : item;
				})}
			</NavDropdown>
		);

	return roles ? <RoleNavPath roles={roles}>{item}</RoleNavPath> : item;
};
