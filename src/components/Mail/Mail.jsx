import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { PACKAGE_STATUS_NAME } from "../../consts";
import { MailButtons } from "../MailButtons";
import { useMail } from "./useMail";

export const Mail = () => {
	const { track } = useParams();
	const mail = useMail(track);
	const address = useSelector((state) => state.auth.address);

	if (!mail) {
		return null;
	}
	const {
		id,
		sender,
		receiver,
		senderAddress,
		receiverAddress,
		packageType,
		packageClass,
		weight,
		deliveryPrice,
		valuePackage,
		deliveryTime,
		allPrice,
		status,
	} = mail;
	const isReceiver = address === receiver;
	const isSender = address === sender;
	return (
		<Container>
			<Row>
				<h3>{track}</h3>
				<Link to={-1}>Назад</Link>
			</Row>
			<Row>
				<Col>
					<p>Отправитель: {sender}</p>
					<p>Адрес отправителя: {senderAddress}</p>
					<p>Тип отправления: {packageType}</p>
					<p>Вес: {weight}</p>
					<p>Заявленная ценность: {valuePackage}</p>
					<p>Статус: {PACKAGE_STATUS_NAME[status]}</p>
				</Col>
				<Col>
					<p>Получатель: {receiver}</p>
					<p>Адрес получателя: {receiverAddress}</p>
					<p>Класс отправления: {packageClass}</p>
					<p>Стоимость доставки: {deliveryPrice}</p>
					<p>Время доставки: {deliveryTime}</p>
					<p>
						Итоговая стоимость: <b>{allPrice}</b>
					</p>
				</Col>
			</Row>
			<Row>
				<MailButtons
					id={id}
					isReceiver={isReceiver}
					isSender={isSender}
					price={allPrice}
					status={status}
				/>
			</Row>
		</Container>
	);
};
