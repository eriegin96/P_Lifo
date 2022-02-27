import { getDate } from 'date-fns';

export const dayStreak = (list) => {
	if (list.length === 0) return 0;

	let count = 1;
	let maxStreak = 1;

	for (let i = 0; i < list.length - 1; i++) {
		const prevTime = list[i].createdAt;
		const prevDate = getDate(list[i].createdAt);
		const nextTime = list[i + 1].createdAt;
		const nextDate = getDate(list[i + 1].createdAt);
		const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

		const condition =
			(nextDate - prevDate === 1 || nextDate - prevDate <= -27) &&
			(nextTime - prevTime) / MILISECONDS_PER_DAY < 2;

		if (condition) {
			count += 1;
		} else {
			count = 1;
		}
		if (count >= maxStreak) maxStreak = count;
	}

	return maxStreak;
};
