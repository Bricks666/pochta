import { Container } from "react-bootstrap";
import { MailsList } from "../components/MailsList";

export const MailsPage = () => {
	return (
		<main>
			<Container>
				<h2>История отправлений</h2>
				<MailsList />
			</Container>
		</main>
	);
};
