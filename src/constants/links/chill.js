const CHILL_LINKS = [
	'https://dl.dropboxusercontent.com/s/abprt68xoomljpj/Sometimes%20I%20Miss%20Myself%20-%20Marlus.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/zb9d4as22irm9vr/Copia%20di%20Hiroyuki%20Kondo%20-%20Memories.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/3pra2d3oypyg979/Copia%20di%20Jon%20Kyoto%20-%20Juishy.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/xg9k8dzj7askft8/Formant%20-%20Safety.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/m9fsyhjtgqjkbuw/4.%20azayaka%20-%20looks%20like%20rain.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/tvtumfj2latvwue/18.%20odd%20panda%20%2B%20v%20i%20v%20-%20luminous%20moss.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/9f694vbq2zor6t8/arya%20-%20daydream.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/1w97mxhj21pdazx/you%20matter-%20arya.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/oyn0z66gdptztq7/Arya%2C%20Brxvs%20-%20lonely%20night%20%281%29.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/qbe3woags717kwo/Sxul%20-%20Closer%20To%20You%20%281%29.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/4viskgqz3djj5lb/miss%20u%20-%20sad.exe.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/8hylbfylsbyx4xl/Deep%20End.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/yrad5a3n9fpmrgi/submarine%20-%20sad.exe.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/4uh0n2b5qncxi3n/Peace%20-%20Nosmo%2C%20Kioshi%20%28Purity%20Label%29.mp3?dl=0',
	'https://dl.dropboxusercontent.com/s/e1iod6g2kc5bdo5/5.%20steezy%20prime%20-%20left%20behind.mp3?dl=0',
];

for (let i = 1; i <= 24; i++) {
	CHILL_LINKS.push(
		`https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/tracks/chill/chill_${i}.mp3`
	);
}

export default CHILL_LINKS;
