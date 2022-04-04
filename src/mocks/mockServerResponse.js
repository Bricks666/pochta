export const mockServerResponse = async (response, timeout = 200) => {
	return await new Promise((resolve) => {
		setTimeout(() => resolve(response), timeout);
	});
};
