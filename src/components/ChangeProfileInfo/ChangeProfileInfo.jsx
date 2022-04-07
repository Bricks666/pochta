import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useField, useUser } from "../../hooks";

export const ChangeProfileInfo = () => {
	const { info } = useUser();
	const [name, setName] = useField(info.name);
	const [address, setAddress] = useField(info.address);

	return (
		<Container>
			<Link to={-1}>Назад</Link>
			<Form>
				<Form.Group>
					<Form.Label>Имя</Form.Label>
					<Form.Control value={name} onChange={setName} placeholder="Имя" />
				</Form.Group>
				<Form.Group>
					<Form.Label>Адрес</Form.Label>
					<Form.Control
						value={address}
						onChange={setAddress}
						placeholder="Адрес"
					/>
				</Form.Group>
				<Button>Сохранить</Button>
			</Form>
		</Container>
	);
};
