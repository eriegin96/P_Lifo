export const convertTime = (time) => {
	let minute, second;

	if (Math.floor(time / 60) < 10) {
		minute = '0' + Math.floor(time / 60);
	} else {
		minute = Math.floor(time / 60);
	}
	if (time % 60 < 10) {
		second = '0' + (time % 60);
	} else {
		second = time % 60;
	}

	const newTime = minute + ':' + second;

	return newTime;
};
