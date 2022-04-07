import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
	return (
		<main>
			<Container>
				<h2>Вход</h2>
				<LoginForm />
				<Link to="registration">Регистрация</Link>
			</Container>
		</main>
	);
};
