import { useCallback } from "react";
import { Button, Form, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useField, useAddresses } from "../../hooks";
import { loginThunk } from "../../models/auth";

export const LoginForm = () => {
	const addresses = useAddresses();
	const error = useSelector((state) => state.auth.loginError);
	const isLoading = useSelector((state) => state.address.isLoading);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [login, setLogin, resetLogin] = useField(-1);
	const onSubmit = useCallback(
		async (evt) => {
			evt.preventDefault();
			const isLogin = await dispatch(loginThunk(login));
			resetLogin();
			if (isLogin) {
				navigate("/");
			}
		},
		[login, dispatch, resetLogin, navigate]
	);
	return (
		<Form onSubmit={onSubmit}>
			{error && (
				<Alert variant="danger">
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
			<Button type="submit">Вход</Button>
		</Form>
	);
};
