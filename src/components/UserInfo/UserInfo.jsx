import { Spinner } from "react-bootstrap";
import { roleMap } from "../../consts";
import { useUser } from "../../hooks";

export const UserInfo = () => {
	const { info, isLoading } = useUser();
	return (
		<section>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<h3>Информация</h3>
					<dl>
						<dt>Имя</dt>
						<dd>{info.name}</dd>
						<dt>Роль</dt>
						<dd>{roleMap[info.role]}</dd>
						<dt>Адрес</dt>
						<dd>{info.address}</dd>
					</dl>
				</>
			)}
		</section>
	);
};
