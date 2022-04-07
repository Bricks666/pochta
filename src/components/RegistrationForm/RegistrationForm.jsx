import { useCallback } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useAddresses, useField } from "../../hooks";
import { registrationThunk } from "../../models/auth";

export const RegistrationForm = () => {
	const error = useSelector((state) => state.auth.registrationError);
	const isLoading = useSelector((state) => state.address.isLoading);
	const addresses = useAddresses();
	const dispatch = useDispatch();
	const [login, setLogin, resetLogin] = useField(-1);
	const [address, setAddress, resetAddress] = useField("");
	const [fio, setFio, resetFio] = useField("");
	const onSubmit = useCallback(
		(evt) => {
			evt.preventDefault();
			dispatch(registrationThunk(login, address, fio));
			resetLogin();
			resetAddress();
			resetFio();
		},
		[login, resetLogin, dispatch, address, fio, resetFio, resetAddress]
	);
	return (
		<Form onSubmit={onSubmit}>
			{error && (
				<Alert>
					<Alert.Heading>Ошибка регистрации</Alert.Heading>
					{error}
				</Alert>
			)}
			<Form.Group>
				<Form.Label>Адрес аккаунта</Form.Label>
				<Form.Select value={login} onChange={setLogin} placeholder="Адрес">
					<option value={-1} />
					{isLoading ? (
						<Spinner />
					) : (
						addresses.map((address) => (
							<option value={address} key={address}>
								{address}
							</option>
						))
					)}
				</Form.Select>
			</Form.Group>
			<Form.Group>
				<Form.Label>Домашний адрес</Form.Label>
				<Form.Control
					value={address}
					onChange={setAddress}
					placeholder="Домашний адрес"
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Фио</Form.Label>
				<Form.Control value={fio} onChange={setFio} placeholder="Фио" />
			</Form.Group>
			<Button>Зарегистрироваться</Button>
		</Form>
	);
};
