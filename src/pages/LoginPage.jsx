import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { PATHS } from "../routes";

export const LoginPage = () => {
	return (
		<main>
			<Container>
				<h2>Вход</h2>
				<LoginForm />
				<Link path={PATHS.registration}>Регистрация</Link>
			</Container>
		</main>
	);
};
