import { Card } from "react-bootstrap";

export const MailCard = ({
	track,
	sender,
	receiver,
	type,
	category,
	duration,
	coast,
	weight,
	declaredCoast,
	totalCoast,
	senderAddress,
	receiverAddress,
}) => {
	return (
		<Card>
			<Card.Body>
				<Card.Title>
					Номер <b>{track}</b>
				</Card.Title>
				<Card.Text>Отправитель {sender}</Card.Text>
				<Card.Text>Адрес отправителя {senderAddress}</Card.Text>
				<Card.Text>Получатель {receiver}</Card.Text>
				<Card.Text>Адрес получателя {receiverAddress}</Card.Text>
				<Card.Text>Тип отправления {type}</Card.Text>
				<Card.Text>Класс отправления {category}</Card.Text>
				<Card.Text>Время доставки {duration}</Card.Text>
				<Card.Text>Стоимость {coast}</Card.Text>
				<Card.Text>Вес {weight}</Card.Text>
				<Card.Text>Объявленная ценность {declaredCoast}</Card.Text>
				<Card.Text>
					Итоговая стоимость <b>{totalCoast}</b>
				</Card.Text>
			</Card.Body>
		</Card>
	);
};
