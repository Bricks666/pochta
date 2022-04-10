import { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { PACKAGE_STATUS } from "../../consts";
import {
	acceptMailThunk,
	cancelMailThunk,
	payMailThunk,
} from "../../models/mails";

export const MailButtons = ({ status, id, isReceiver, isSender, price }) => {
	const dispatch = useDispatch();
	const [isRequest, setIsRequest] = useState(false);
	const onPay = useCallback(async () => {
		setIsRequest(true);
		await dispatch(payMailThunk(id, price));
		setIsRequest(false);
	}, [dispatch, id, price]);

	const onAccept = useCallback(async () => {
		setIsRequest(true);
		await dispatch(acceptMailThunk(id));
		setIsRequest(false);
	}, [dispatch, id]);

	const onCancel = useCallback(async () => {
		setIsRequest(true);
		await dispatch(cancelMailThunk(id));
		setIsRequest(false);
	}, [dispatch, id]);

	if (status === PACKAGE_STATUS.WAIT_FOR_PAY && isSender) {
		console.log(status, id, isReceiver, isSender, price);
		return (
			<Button variant="primary" onClick={onPay} disabled={isRequest}>
				Оплатить
			</Button>
		);
	}

	if (status === PACKAGE_STATUS.DELIVERY && isReceiver) {
		return (
			<>
				<Button variant="success" onClick={onAccept} disabled={isRequest}>
					Принять
				</Button>
				<Button variant="danger" onClick={onCancel} disabled={isRequest}>
					Отклонить
				</Button>
			</>
		);
	}

	return null;
};
