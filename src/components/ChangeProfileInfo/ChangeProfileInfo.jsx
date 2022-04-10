import { useCallback } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useField, useUser } from "../../hooks";
import { changeInfoThunk } from "../../models/user";

export const ChangeProfileInfo = () => {
	const { info } = useUser();
	const [name, setName] = useField(info.name);
	const [address, setAddress] = useField(info.homeAddress);

	const dispatch = useDispatch();

	const onSave = useCallback(
		(evt) => {
			evt.preventDefault();
			dispatch(changeInfoThunk(address, name, true));
		},
		[dispatch, address, name]
	);

	return (
		<Container>
			<Link to={-1}>Назад</Link>
			<Form onSubmit={onSave}>
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
				<Button type="submit">Сохранить</Button>
			</Form>
		</Container>
	);
};
