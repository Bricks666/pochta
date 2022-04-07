import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useMail } from "./useMail";

export const Mail = () => {
	const { track } = useParams();
	const mail = useMail(track);
	return (
		<Container>
			{mail && (
				<>
					<h3>{mail.track}</h3>
					<Row>
						<Col>
							<p>Отправитель {mail.sender}</p>
							<p>Адрес отправителя {mail.senderAddress}</p>
							<p>Тип {mail.type}</p>
							<p>Срок доставки {mail.duration}</p>
							<p>Вес {mail.weight}</p>
							<p>Итоговая стоимость {mail.totalCoast}</p>
						</Col>
						<Col>
							<p>Получатель {mail.receiver}</p>
							<p>Адрес получателя {mail.receiverAddress}</p>
							<p>Класс {mail.category}</p>
							<p>Стоимость {mail.coast}</p>
							<p>Установленная ценность {mail.declaredCoast}</p>
						</Col>
					</Row>
				</>
			)}
		</Container>
	);
};
