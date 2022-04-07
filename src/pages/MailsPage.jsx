import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { MailsList } from "../components/MailsList";
import { Mail } from "../components/Mail";

export const MailsPage = () => {
	return (
		<main>
			<Container>
				<h2>Отправления</h2>
				<Routes>
					<Route path="*" element={<MailsList />} />
					<Route path=":track" element={<Mail />} />
				</Routes>
			</Container>
		</main>
	);
};
