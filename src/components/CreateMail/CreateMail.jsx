import { Container } from "react-bootstrap";
import { CreateMailForm } from "../CreateMailForm";

export const CreateMail = () => {
	return (
		<Container>
			<h3>Добавление отправления</h3>
			<CreateMailForm />
		</Container>
	);
};
