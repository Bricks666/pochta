import { Alert } from "bootstrap";
import { useCallback } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useField, useAddresses } from "../../hooks";
import { loginThunk } from "../../models/auth";

export const LoginForm = () => {
	const addresses = useAddresses();
	const error = useSelector((state) => state.auth.loginError);
	const isLoading = useSelector((state) => state.address.isLoading);
	const dispatch = useDispatch();
	const [login, setLogin, resetLogin] = useField(-1);
	const onSubmit = useCallback(
		(evt) => {
			evt.preventDefault();
			dispatch(loginThunk(login));
			resetLogin();
		},
		[login, dispatch, resetLogin]
	);
	return (
		<Form onSubmit={onSubmit}>
			{error && (
				<Alert>
					<Alert.Heading>Ошибка входа</Alert.Heading>
					{error}
				</Alert>
			)}
			<Form.Group>
				<Form.Label>Логин</Form.Label>
				{isLoading ? (
					<Spinner />
				) : (
					<Form.Select value={login} onChange={setLogin}>
						<option value={-1} />
						{addresses.map((address) => (
							<option value={address} key={address}>
								{address}
							</option>
						))}
					</Form.Select>
				)}
			</Form.Group>
			<Button>Вход</Button>
		</Form>
	);
};
