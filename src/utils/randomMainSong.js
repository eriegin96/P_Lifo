export const randomMainSong = (list, currentIndex) => {
	list.splice(currentIndex, 1);

	const randomIndex = Math.floor(Math.random() * (list.length - 1));

	return { index: randomIndex, link: list[randomIndex] };
};

export const nextSong = (list, currentIndex) => {
	let newIndex;
	if (currentIndex < 0 || currentIndex >= list.length - 1) {
		newIndex = 0;
	} else {
		newIndex = currentIndex + 1;
	}

	return { index: newIndex, link: list[newIndex] };
};

export const prevSong = (list, currentIndex) => {
	let newIndex;
	if (currentIndex > list.length - 1 || currentIndex <= 0) {
		newIndex = list.length - 1;
	} else {
		newIndex = currentIndex - 1;
	}

	return { index: newIndex, link: list[newIndex] };
};
