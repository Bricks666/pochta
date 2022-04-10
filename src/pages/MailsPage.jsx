import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { MailsList } from "../components/MailsList";
import { Mail } from "../components/Mail";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { CreateMail } from "../components/CreateMail";
import { resetMailsAC } from "../models/mails";

export const MailsPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(resetMailsAC());
		};
	}, [dispatch]);
	return (
		<main>
			<Container>
				<h2>Отправления</h2>
				<Routes>
					<Route path="all" element={<MailsList />} />
					<Route path="add" element={<CreateMail />} />
					<Route path=":track" element={<Mail />} />
				</Routes>
			</Container>
		</main>
	);
};
