import { Container, ListGroup, Spinner } from "react-bootstrap";
import { useMails } from "../../hooks/useMails";
import { MailCard } from "./MailCard";

export const MailsList = () => {
	const { isLoading, mails } = useMails();
	console.log(mails, isLoading);

	return (
		<Container>
			<h3>История</h3>
			{isLoading ? (
				<Spinner />
			) : (
				<ListGroup as="div">
					{mails.map((mail) => (
						<ListGroup.Item key={mail.track}>
							<MailCard {...mail} />
						</ListGroup.Item>
					))}
				</ListGroup>
			)}
		</Container>
	);
};
