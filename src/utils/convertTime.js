export const convertTime = (time) => {
	let hour, minute, second;
	const remaining = time - Math.floor(time / 3600) * 3600;

	if (Math.floor(time / 3600) < 1) {
		hour = 0;
	} else if (Math.floor(time / 3600) < 10) {
		hour = '0' + Math.floor(time / 3600);
	} else {
		hour = Math.floor(time / 3600);
	}

	if (Math.floor(remaining / 60) < 10) {
		minute = '0' + Math.floor(remaining / 60);
	} else {
		minute = Math.floor(remaining / 60);
	}

	if (remaining % 60 < 10) {
		second = '0' + (remaining % 60);
	} else {
		second = remaining % 60;
	}

	const newTime = `${hour > 0 ? hour + ':' : ''}${minute}:${second}`;

	return newTime;
};
