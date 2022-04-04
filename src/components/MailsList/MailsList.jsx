import { ListGroup, Spinner } from "react-bootstrap";
import { useMails } from "./useMails";
import { MailCard } from "./MailCard";

export const MailsList = () => {
	const { isLoading, mails } = useMails();

	return (
		<section>
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
		</section>
	);
};
