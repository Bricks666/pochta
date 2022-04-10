import { useCallback, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
	acceptTransferThunk,
	cancelTransferThunk,
} from "../../../models/transfers";

export const TransferCard = ({
	id,
	sender,
	receiver,
	liveTime,
	value,
	sendAt,
	isFinish,
	isSender,
}) => {
	const dispatch = useDispatch();
	const onAccept = useCallback(
		() => dispatch(acceptTransferThunk(id)),
		[id, dispatch]
	);
	const onCancel = useCallback(
		() => dispatch(cancelTransferThunk(id)),
		[id, dispatch]
	);

	useEffect(() => {
		if (!isFinish) {
			const timeout = setInterval(() => {
				console.log(sendAt + liveTime * 3 * 100, Date.now());
				if (sendAt + liveTime * 3 * 1000 <= Date.now()) {
					dispatch(cancelTransferThunk(id));
					clearInterval(timeout);
				}
			}, 100);
			return () => {
				clearInterval(timeout);
			};
		}
	}, [id, dispatch, isFinish, sendAt, liveTime]);
	return (
		<Card>
			<Card.Header>
				<Card.Title>Денежный перевод #{id}</Card.Title>
			</Card.Header>
			<Card.Body>
				<Card.Text>Отправитель: {sender}</Card.Text>
				<Card.Text>Получатель: {receiver}</Card.Text>
				<Card.Text>
					Сумма перевода:
					<b>{value}</b>
				</Card.Text>
				<Card.Text>Отправлено: {new Date(sendAt).toLocaleString()}</Card.Text>
				<Card.Text>Срок жизни: {liveTime} дней</Card.Text>
			</Card.Body>
			<Card.Footer>
				{isFinish ? (
					<Card.Text>Завершено</Card.Text>
				) : (
					<>
						{!isSender && (
							<Button onClick={onAccept} variant="success">
								Принять
							</Button>
						)}
						<Button onClick={onCancel} variant="danger">
							{isSender ? "Отменить" : "Отклонить"}
						</Button>
					</>
				)}
			</Card.Footer>
		</Card>
	);
};
