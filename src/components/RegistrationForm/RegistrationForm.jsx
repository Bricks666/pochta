import { Button, Form } from "react-bootstrap";
import { useField } from "../../hooks";

export const RegistrationForm = () => {
	const [login, setLogin] = useField("");
	const [password, setPassword] = useField("");
	return (
		<Form>
			<Form.Control value={login} onChange={setLogin} placeholder="Логин" />
			<Form.Control
				value={password}
				onChange={setPassword}
				placeholder="Пароль"
			/>
			<Button>Зарегистрироваться</Button>
		</Form>
	);
};
