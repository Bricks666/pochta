import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PACKAGE_STATUS_NAME } from "../../../consts";
import { MailButtons } from "../../MailButtons/MailButtons";

export const MailCard = ({
	id,
	track,
	sender,
	receiver,
	packageType,
	packageClass,
	weight,
	allPrice,
	status,
	isReceiver,
	isSender,
}) => {
	return (
		<Card>
			<Card.Header>
				<Card.Title>
					Номер <b>{track}</b>
				</Card.Title>
			</Card.Header>
			<Card.Body>
				<Col>
					<Card.Text>Отправитель: {sender}</Card.Text>
					<Card.Text>Тип отправления: {packageType}</Card.Text>
					<Card.Text>Вес: {weight}</Card.Text>
					<Card.Text>Статус: {PACKAGE_STATUS_NAME[status]}</Card.Text>
				</Col>
				<Col>
					<Card.Text>Получатель: {receiver}</Card.Text>
					<Card.Text>Класс отправления: {packageClass}</Card.Text>
					<Card.Text>
						Итоговая стоимость: <b>{allPrice}</b>
					</Card.Text>
				</Col>
			</Card.Body>
			<Card.Footer>
				<Card.Link as={Link} to={track}>
					Подробнее
				</Card.Link>
				<MailButtons
					isSender={isSender}
					isReceiver={isReceiver}
					id={id}
					status={status}
					price={allPrice}
				/>
			</Card.Footer>
		</Card>
	);
};
