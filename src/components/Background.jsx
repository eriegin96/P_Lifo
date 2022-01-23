import React, { useContext } from 'react';

import { AppContext } from '../context/AppProvider';

export default function Background() {
	const { background } = useContext(AppContext);

	return (
		<div className='absolute inset-0'>
			<div className='relative w-full h-full'>
				<div
					className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
						background.showTop ? 'opacity-100' : 'opacity-0'
					}`}
				>
					<video
						src={background.linkTop}
						autoPlay
						muted
						loop
						playsInline
						className='w-full h-full object-cover'
					/>
				</div>

				<div
					className={`absolute inset-0 transition duration-500 ease-in-out ${
						!background.showTop ? 'opacity-100' : 'opacity-0'
					}`}
				>
					<video
						autoPlay
						src={background.linkBot}
						muted
						loop
						playsInline
						className='w-full h-full object-cover'
					/>
				</div>
			</div>
		</div>
	);
}
