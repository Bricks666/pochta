import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MailCard = ({
	track,
	sender,
	receiver,
	type,
	category,
	duration,
	totalCoast,
}) => {
	return (
		<Card>
			<Card.Header>
				<Card.Title>
					Номер <b>{track}</b>
				</Card.Title>
			</Card.Header>
			<Card.Body>
				<Card.Text>Отправитель {sender}</Card.Text>
				<Card.Text>Получатель {receiver}</Card.Text>
				<Card.Text>Тип отправления {type}</Card.Text>
				<Card.Text>Класс отправления {category}</Card.Text>
				<Card.Text>Время доставки {duration}</Card.Text>
				<Card.Text>
					Итоговая стоимость <b>{totalCoast}</b>
				</Card.Text>
			</Card.Body>
			<Card.Footer>
				<Card.Link as={Link} to={track}>
					Подробнее
				</Card.Link>
			</Card.Footer>
		</Card>
	);
};
