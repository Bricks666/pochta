import { useCallback } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddresses, useField } from "../../hooks";
import { registrationThunk } from "../../models/auth";

export const RegistrationForm = () => {
	const error = useSelector((state) => state.auth.registrationError);
	const isLoading = useSelector((state) => state.address.isLoading);
	const addresses = useAddresses();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [login, setLogin, resetLogin] = useField(-1);
	const [address, setAddress, resetAddress] = useField("");
	const [fio, setFio, resetFio] = useField("");
	const onSubmit = useCallback(
		async (evt) => {
			evt.preventDefault();
			const isRegistration = await dispatch(
				registrationThunk(login, address, fio)
			);
			resetLogin();
			resetAddress();
			resetFio();

			if (isRegistration) {
				navigate("/login");
			}
		},
		[
			login,
			resetLogin,
			dispatch,
			address,
			fio,
			resetFio,
			resetAddress,
			navigate,
		]
	);
	return (
		<Form onSubmit={onSubmit}>
			{error && (
				<Alert variant="danger">
					<Alert.Heading>Ошибка регистрации</Alert.Heading>
					{error}
				</Alert>
			)}
			<Form.Group>
				<Form.Label>Адрес аккаунта</Form.Label>
				{isLoading ? (
					<Spinner />
				) : (
					<Form.Select value={login} onChange={setLogin} placeholder="Адрес">
						<option value={-1} />

						{addresses.map((address) => (
							<option value={address} key={address}>
								{address}
							</option>
						))}
					</Form.Select>
				)}
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
			<Button type="submit">Зарегистрироваться</Button>
		</Form>
	);
};
