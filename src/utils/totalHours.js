export const totalHours = (list) => {
	return list.reduce((prev, current) => prev + Math.ceil(current.time / 3600), 0);
};
