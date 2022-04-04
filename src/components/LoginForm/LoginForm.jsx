import { Button, Form } from "react-bootstrap";
import { useField } from "../../hooks";

export const LoginForm = () => {
	const [login, setLogin] = useField("");
	const [password, setPassword] = useField("");
	return (
		<Form>
			<Form.Group>
				<Form.Label>Логин</Form.Label>
				<Form.Control value={login} onChange={setLogin} placeholder="Логин" />
			</Form.Group>
			<Form.Group>
				<Form.Label>Пароль</Form.Label>
				<Form.Control
					type="password"
					value={password}
					onChange={setPassword}
					placeholder="Пароль"
				/>
			</Form.Group>
			<Button>Вход</Button>
		</Form>
	);
};
