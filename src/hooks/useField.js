import { useCallback, useState } from "react";

export const useField = (defaultValue = "") => {
	const [value, setValue] = useState(defaultValue);

	return [
		value,
		useCallback((evt) => setValue(evt.target.value), []),
		useCallback(() => {
			setValue(defaultValue);
		}, [defaultValue]),
	];
};
