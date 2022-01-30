export const currentMode = (day, rainy) => {
	if (day && !rainy) return 'day';
	if (day && rainy) return 'rainyDay';
	if (!day && !rainy) return 'night';
	if (!day && rainy) return 'rainyNight';
};

export const newBackground = (currentBg, mode, linkObj) => {
	const showTop = !currentBg.showTop;
	let newDay = currentBg.day;
	let newRainy = currentBg.rainy;
	let { day, rainy, linkTop, linkBot, top, bot } = currentBg;

	if (mode === 'day') {
		newDay = !currentBg.day;

		if (day && !rainy) {
			bot = 'night';
			linkBot = linkObj.night;
		}
		if (day && rainy) {
			top = 'rainyNight';
			linkTop = linkObj.rainyNight;
		}
		if (!day && !rainy) {
			top = 'day';
			linkTop = linkObj.day;
		}
		if (!day && rainy) {
			bot = 'rainyDay';
			linkBot = linkObj.rainyDay;
		}
	} else if (mode === 'rainy') {
		newRainy = !currentBg.rainy;

		if (day && !rainy) {
			bot = 'rainyDay';
			linkBot = linkObj.rainyDay;
		}
		if (day && rainy) {
			top = 'day';
			linkTop = linkObj.day;
		}
		if (!day && !rainy) {
			top = 'rainyNight';
			linkTop = linkObj.rainyNight;
		}
		if (!day && rainy) {
			bot = 'night';
			linkBot = linkObj.night;
		}
	}

	return { ...currentBg, showTop, day: newDay, rainy: newRainy, top, bot, linkTop, linkBot };
};
