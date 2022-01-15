const JAZZY_LINKS = [
	'https://dl.dropboxusercontent.com/s/41diboemt3wigc2/Jazzy%20project%204.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/3pra2d3oypyg979/Copia%20di%20Jon%20Kyoto%20-%20Juishy.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/r5kquf111l791ty/1%20oasis%20%5Bi_m.busy%5D.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/oqkmwiybl32jfa7/Enoki%20-%20Matcha.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/w3rfmdc0i0zcun4/Jeffu%20-%20Loveless%20Love%20-%20Lifted%20LoFi%20Records.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/c7njqdeeteqxa8u/Dimmed%20%28Droemsk%2C%20User67%2C%20Sftspkn%2C%20Jokujekku%29.wav?dl=0',
	'https://dl.dropboxusercontent.com/s/6deh6m6cm1q986o/Brxvs%20-%20November%20Rain%20-%20Lifted%20LoFi%20Records.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/n9p4mosvmwye002/let%27s%20chill%20-%20sad.exe.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/xbwilu10xffkxmq/Jazzy%20project%207.mp3?dl=0',
	'https://dl.dropboxusercontent.com//s/8ddp3qhz5ema5oc/CaliCronk%20-%20Stuck%20Inside%20-%20Lifted%20LoFi%20Records%20%281%29.mp3?dl=0',
];

for (let i = 1; i <= 25; i++) {
	JAZZY_LINKS.push(
		`https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/jazzy/jazzy_${i}.mp3`
	);
}

export default JAZZY_LINKS;
