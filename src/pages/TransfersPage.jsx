import { Container } from "react-bootstrap";
import { TransfersList } from "../components/TransfersList";
import { CreateTransferForm } from "../components/CreateTransferForm";

export const TransfersPage = () => {
	return (
		<main>
			<Container>
				<h2>Денежные переводы</h2>
				<CreateTransferForm />
				<TransfersList />
			</Container>
		</main>
	);
};
