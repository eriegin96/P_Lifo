import React, { useContext } from 'react';
import { NOISE_LINKS } from '../constants/links/noises';
import { AppContext } from '../context/AppProvider';

export default function Audio() {
	const { mainSoundRef, noisesRefs } = useContext(AppContext);

	return (
		<div>
			Audio
			{NOISE_LINKS.map((link, i) => (
				<audio
					key={i}
					src={link}
					ref={(el) => {
						noisesRefs.current[i] = el;
					}}
					autoPlay
					loop
					muted
				/>
			))}
		</div>
	);
}
