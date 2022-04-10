import { Container, ListGroup, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useMails } from "../../hooks/useMails";
import { MailCard } from "./MailCard";

export const MailsList = () => {
	const { isLoading, mails } = useMails();
	const address = useSelector((state) => state.auth.address);

	return (
		<Container>
			<h3>История</h3>
			{isLoading ? (
				<Spinner />
			) : (
				<ListGroup as="div">
					{mails.map((mail) => (
						<ListGroup.Item key={mail.id}>
							<MailCard
								{...mail}
								isReceiver={address === mail.receiver}
								isSender={address === mail.sender}
							/>
						</ListGroup.Item>
					))}
				</ListGroup>
			)}
		</Container>
	);
};
