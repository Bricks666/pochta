import { useCallback } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendMailThunk } from "../../models/mails";
import { useUserAddresses, useBalance, useField } from "../../hooks";
import {
	PACKAGE_CLASS,
	PACKAGE_CLASS_NAME,
	PACKAGE_TYPE,
	PACKAGE_TYPE_NAME,
	PRECISION,
} from "../../consts";
import { toEth } from "../../utils";

const deliveryTime = {
	[PACKAGE_CLASS.FIRST]: 10,
	[PACKAGE_CLASS.SECOND]: 15,
	[PACKAGE_CLASS.THIRD]: 20,
};
const deliveryPrice = {
	[PACKAGE_CLASS.FIRST]: 0.5,
	[PACKAGE_CLASS.SECOND]: 0.3,
	[PACKAGE_CLASS.THIRD]: 0.1,
};

const calculateAllPrice = (deliveryPrice, weight, valuePackage) => {
	return (deliveryPrice * weight + valuePackage * 0.2).toFixed(PRECISION);
};
export const CreateMailForm = () => {
	const dispatch = useDispatch();
	const addresses = useUserAddresses();
	const [sender, setSender, resetSender] = useField(0);
	const [receiver, setReceiver, resetReceiver] = useField(0);
	const [typePackage, setTypePackage, resetTypePackage] = useField(0);
	const [packageClass, setPackageClass, resetPackageClass] = useField(2);
	const [weight, setWeight, resetWeight] = useField(0);
	const [valuePackage, setValuePackage, resetValuePackage] = useField(0);
	const allPrice = calculateAllPrice(
		deliveryPrice[packageClass],
		weight,
		valuePackage
	);
	const senderBalance = useBalance(sender);
	const onSubmit = useCallback(
		async (evt) => {
			evt.preventDefault();
			await dispatch(
				sendMailThunk({
					sender,
					receiver,
					typePackage,
					packageClass,
					weight,
					valuePackage,
					allPrice: allPrice,
					deliveryPrice: deliveryPrice[packageClass],
					deliveryTime: deliveryTime[packageClass],
				})
			);
			resetPackageClass();
			resetReceiver();
			resetSender();
			resetTypePackage();
			resetValuePackage();
			resetWeight();
		},
		[
			dispatch,
			sender,
			receiver,
			typePackage,
			packageClass,
			weight,
			valuePackage,
			allPrice,
		]
	);
	const allRequiredFieldFill = !!sender && !!receiver && !!weight;
	const haveEnoughMoney = toEth(senderBalance) >= allPrice;
	const disabledButton = !allRequiredFieldFill || !haveEnoughMoney;
	return (
		<Form onSubmit={onSubmit}>
			<Row>
				<Col>
					<Form.Group>
						<Form.Label>??????????????????????</Form.Label>
						<Form.Select value={sender} onChange={setSender}>
							<option value={0} />
							{addresses.map((address) =>
								address === receiver ? null : (
									<option value={address} key={address}>
										{address}
									</option>
								)
							)}
						</Form.Select>
					</Form.Group>
					<Form.Group>
						<Form.Label>?????? ??????????????????????</Form.Label>
						<Form.Select value={typePackage} onChange={setTypePackage}>
							{Object.values(PACKAGE_TYPE).map((code) => (
								<option value={code} key={code}>
									{PACKAGE_TYPE_NAME[code]}
								</option>
							))}
						</Form.Select>
					</Form.Group>
					<Form.Group>
						<Form.Label>??????</Form.Label>
						<Form.Control
							value={weight}
							onChange={setWeight}
							placeholder="??????"
							min={0}
							max={10}
							step={0.1}
							type="number"
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group>
						<Form.Label>????????????????????</Form.Label>
						<Form.Select value={receiver} onChange={setReceiver}>
							<option value={0} />
							{addresses.map((address) =>
								address === sender ? null : (
									<option value={address} key={address}>
										{address}
									</option>
								)
							)}
						</Form.Select>
					</Form.Group>
					<Form.Group>
						<Form.Label>?????????? ??????????????????????</Form.Label>
						<Form.Select value={packageClass} onChange={setPackageClass}>
							{Object.values(PACKAGE_CLASS).map((code) => (
								<option value={code} key={code}>
									{PACKAGE_CLASS_NAME[code]}
								</option>
							))}
						</Form.Select>
					</Form.Group>
					<Form.Group>
						<Form.Label>?????????????????????? ????????????????</Form.Label>
						<Form.Control
							value={valuePackage}
							onChange={setValuePackage}
							placeholder="?????????????????????? ??????????????????"
							min={0}
							step={0.1}
							type="number"
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col>
					<Form.Group>
						<Form.Label>?????????????????? ????????????????(???? ???? ??????????)</Form.Label>
						<Form.Control value={deliveryPrice[packageClass]} readOnly={true} />
					</Form.Group>
				</Col>
				<Col>
					<Form.Group>
						<Form.Label>?????????? ????????????????</Form.Label>
						<Form.Control value={deliveryTime[packageClass]} readOnly={true} />
					</Form.Group>
				</Col>
				<Col>
					<Form.Group>
						<Form.Label>???????????????? ??????????????????</Form.Label>
						<Form.Control
							value={calculateAllPrice(
								deliveryPrice[packageClass],
								weight,
								valuePackage
							)}
							readOnly={true}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col>
					<Button disabled={disabledButton} type="submit">
						??????????????????
					</Button>
				</Col>
			</Row>
		</Form>
	);
};
