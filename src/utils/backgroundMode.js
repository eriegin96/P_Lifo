export const newBackground = (currentBg, mode, linkObj) => {
	let newDay = currentBg.day,
		newRainy = currentBg.rainy,
		linkTop,
		linkBot;
	const showTop = !currentBg.showTop;
	const { day, rainy } = currentBg;

	if (mode === 'day') {
		newDay = !currentBg.day;

		if (day && !rainy) linkBot = linkObj.night;
		if (day && rainy) linkTop = linkObj.rainyNight;
		if (!day && !rainy) linkTop = linkObj.day;
		if (!day && rainy) linkBot = linkObj.rainyDay;
	} else if (mode === 'rainy') {
		newRainy = !currentBg.rainy;

		if (day && !rainy) linkBot = linkObj.rainyDay;
		if (day && rainy) linkTop = linkObj.day;
		if (!day && !rainy) linkTop = linkObj.rainyNight;
		if (!day && rainy) linkBot = linkObj.night;
	}

	return { ...currentBg, showTop, day: newDay, rainy: newRainy, linkTop, linkBot };
};
