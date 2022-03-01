import React, { useContext } from 'react';

import { Button } from '..';
import { AppContext } from '../../context/AppProvider';
import { closeIcon } from '../../assets/icons';

export default function VideoPlayer() {
	const { draggableModalType, setDraggableModalType, videoId } = useContext(AppContext);

	return (
		<div className='absolute top-24 left-1/2 transform -translate-x-1/2 animate-fadeIn'>
			<div className='handle cursor-move p-6 flex flex-col justify-center items-center rounded-2xl bg-black'>
				<Button
					className='absolute top-4 right-4'
					onClick={() => {
						setDraggableModalType({ ...draggableModalType, videoPlayer: false });
					}}
				>
					<img src={closeIcon} alt='close' />
				</Button>

				<iframe
					id='ytplayer'
					type='text/html'
					width='480'
					height='270'
					src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
					frameBorder='0'
				></iframe>
			</div>
		</div>
	);
}
