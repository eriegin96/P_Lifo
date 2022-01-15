const SLEEPY_LINKS = [
	'https://dl.dropboxusercontent.com/s/yx3m5krsx51xk1d/gerardo%20millan%20%2B%20enoch%20-%20wherever%20i%20go%20%281%29.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/3bykoob8z86dn0m/among%20the%20stars-%20arya.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/utt4n7rvk2ql4y1/hotcoco.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/yrad5a3n9fpmrgi/submarine%20-%20sad.exe.mp3?dl=0',
	'https://dl.dropboxusercontent.com//s/tekpv6wv73i33cg/%285%29%20This%20Cant%20Be%20The%20End.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/zsfrsdz4tq00fab/sike%20beats%20-%20mondays.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/w5tkk03e73s6wrm/Momentum%20-%20Sleepermane.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/ur3axsv18llcqrs/Tranquil%20Teddy%20-%20Stella%20%281%29.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/qs091kjzholwyl1/Raining%20Crystals.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/n7ze2t8pa5qt4ey/14.%20redmatic%20-%20open%20eyes.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/s31vjn3v1rjbrdn/Formant%20-%20Thread.mp3?dl=0',
];

for (let i = 1; i <= 19; i++) {
	SLEEPY_LINKS.push(
		`https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/sleepy/sleepy_${i}.mp3`
	);
}

export default SLEEPY_LINKS;
