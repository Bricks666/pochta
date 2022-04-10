import { useCallback } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ROLES } from "../../../consts";
import { useUser } from "../../../hooks";
import {
	upgradeToAdminThunk,
	upgradeToPostmanThunk,
} from "../../../models/users";
import { UserInfo } from "../../UserInfo";

export const UserCard = ({ info }) => {
	const {
		info: { role },
	} = useUser();
	const dispatch = useDispatch();

	const onSetAdmin = useCallback(
		() => dispatch(upgradeToAdminThunk(info.address)),
		[dispatch, info.address]
	);
	const onSetPostman = useCallback(
		() => dispatch(upgradeToPostmanThunk(info.address)),
		[dispatch, info.address]
	);
	return (
		<Card>
			<Row>
				<Card.Header>
					<Card.Title>{info.address}</Card.Title>
				</Card.Header>
			</Row>
			<Row>
				<Col>
					<Card.Body>
						<UserInfo {...info} />
					</Card.Body>
				</Col>

				{info.role === ROLES.USER && (
					<Col xs={2}>
						<Card.Footer>
							{role === ROLES.ADMIN && (
								<Button onClick={onSetPostman}>Сделать почтальоном</Button>
							)}
							{role === ROLES.MAIN_ADMIN && (
								<Button onClick={onSetAdmin}>Сделать админом</Button>
							)}
						</Card.Footer>
					</Col>
				)}
			</Row>
		</Card>
	);
};
