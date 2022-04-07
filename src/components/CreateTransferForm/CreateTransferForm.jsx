import { useCallback } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useAddresses, useBalance, useField } from "../../hooks";
import { sendTransferThunk } from "../../models/transfers";

export const CreateTransferForm = () => {
	const addresses = useAddresses();
	const address = useSelector((state) => state.auth.address);
	const dispatch = useDispatch();
	const balance = useBalance(address);
	const [receiver, setReceiver, resetReceiver] = useField(-1);
	const [value, setValue, resetValue] = useField(0);
	const [liveTime, setLiveTime, resetLiveTime] = useField("");
	const onSubmit = useCallback(
		(evt) => {
			evt.preventDefault();
			dispatch(sendTransferThunk(receiver, value, liveTime));
			resetLiveTime();
			resetValue();
			resetReceiver();
		},
		[
			dispatch,
			receiver,
			value,
			liveTime,
			resetLiveTime,
			resetReceiver,
			resetValue,
		]
	);
	return (
		<Container>
			<Form onSubmit={onSubmit}>
				<Form.Group>
					<Form.Label>Получатель</Form.Label>
					<Form.Select value={receiver} onChange={setReceiver}>
						{addresses.map((receiver) =>
							address === receiver ? undefined : (
								<option value={receiver} key={receiver}>
									{receiver}
								</option>
							)
						)}
					</Form.Select>
				</Form.Group>
				<Form.Group>
					<Form.Label>Сумма</Form.Label>
					<Form.Control
						value={value}
						onChange={setValue}
						min={0}
						max={balance}
						step={0.1}
						placeholder="Сумма"
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Время жизни</Form.Label>
					<Form.Control
						value={liveTime}
						onChange={setLiveTime}
						placeholder=""
					/>
				</Form.Group>
				<Button>Отправить</Button>
			</Form>
		</Container>
	);
};
