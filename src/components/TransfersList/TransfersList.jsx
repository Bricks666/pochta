import { Container, ListGroup, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useTransfers } from "./useTransfers";
import { TransferCard } from "./TransferCard";

export const TransfersList = () => {
	const { isLoading, transfers } = useTransfers();
	const address = useSelector((state) => state.auth.address);
	return (
		<Container>
			{isLoading ? (
				<Spinner />
			) : (
				<ListGroup>
					{transfers.map((transfer) => (
						<ListGroup.Item key={transfer.id}>
							<TransferCard
								{...transfer}
								isSender={transfer.sender === address}
							/>
						</ListGroup.Item>
					))}
				</ListGroup>
			)}
		</Container>
	);
};
