import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RegistrationForm } from "../components/RegistrationForm";
import { PATHS } from "../routes";

export const RegistrationPage = () => {
	return (
		<main>
			<Container>
				<h2>Регистрация</h2>
				<RegistrationForm />
				<Link path={PATHS.login}>Вход</Link>
			</Container>
		</main>
	);
};
