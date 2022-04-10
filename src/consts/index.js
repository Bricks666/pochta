export const roleMap = {
	0: "Пользователь",
	1: "Сотрудник почтового отделения",
	2: "Администратор",
	3: "Главный администратор",
};

export const PACKAGE_CLASS = {
	FIRST: 0,
	SECOND: 1,
	THIRD: 2,
};

export const PACKAGE_TYPE = {
	LETTER: 0,
	PACKAGE: 1,
	PARCEL: 2,
};

export const PACKAGE_CLASS_NAME = {
	[PACKAGE_CLASS.FIRST]: "Первый",
	[PACKAGE_CLASS.SECOND]: "Второй",
	[PACKAGE_CLASS.THIRD]: "Третий",
};

export const PACKAGE_TYPE_NAME = {
	[PACKAGE_TYPE.LETTER]: "Письмо",
	[PACKAGE_TYPE.PACKAGE]: "Бандероль",
	[PACKAGE_TYPE.PARCEL]: "Посылка",
};

export const PRECISION = 1;

export const PACKAGE_STATUS = {
	WAIT_FOR_PAY: 0,
	DELIVERY: 1,
	CANCELED: 2,
	ACCEPTED: 3,
};

export const PACKAGE_STATUS_NAME = {
	[PACKAGE_STATUS.WAIT_FOR_PAY]: "Ожидание оплаты",
	[PACKAGE_STATUS.DELIVERY]: "Доставляется",
	[PACKAGE_STATUS.CANCELED]: "Отклонена",
	[PACKAGE_STATUS.ACCEPTED]: "Принята",
};
