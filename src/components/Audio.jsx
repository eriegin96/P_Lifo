import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppProvider';

import { playIcon, pauseIcon, prevIcon, nextIcon, clockIcon } from '../assets/icons';
import { Button } from '.';
import { nextSong, prevSong } from '../utils/randomMainSong';
import { NOISE_LINKS } from '../constants';
import { convertTime } from '../utils/convertTime';

export default function Audio() {
	const {
		alarmOn,
		mainSongRef,
		noisesRef,
		alarmRef,
		alarmLink,
		isPlaying,
		setIsPlaying,
		currentSong,
		setCurrentSong,
		isBreak,
		currentSession,
		sessionTime,
		breakTime,
		draggableModalType,
		setDraggableModalType,
	} = useContext(AppContext);

	useEffect(() => {
		mainSongRef.current.volume = 0.5;
	}, [mainSongRef]);

	const handlePlay = () => {
		setIsPlaying(true);
		if (mainSongRef.current.paused) mainSongRef.current.play();
	};

	const handlePause = () => {
		setIsPlaying(false);
		if (!mainSongRef.current.paused) mainSongRef.current.pause();
	};

	return (
		<div className='fixed bottom-0 w-screen'>
			<div className='p-8 pb-4 relative flex justify-between items-center'>
				<p className='opacity-50 text-sm'>Music by - lofi.co 2021 ©</p>
				<div>
					<Button
						onClick={() =>
							setCurrentSong({
								...currentSong,
								index: prevSong(currentSong.list, currentSong.index).index,
								link: prevSong(currentSong.list, currentSong.index).link,
							})
						}
					>
						<img src={prevIcon} alt='prev' />
					</Button>
					{!isPlaying && (
						<Button className='mx-4' onClick={handlePlay}>
							<img src={playIcon} alt='prev' width={54} height={54} />
						</Button>
					)}
					{isPlaying && (
						<Button className='mx-4' onClick={handlePause}>
							<img src={pauseIcon} alt='prev' width={54} height={54} />
						</Button>
					)}
					<Button
						onClick={() =>
							setCurrentSong({
								...currentSong,
								index: nextSong(currentSong.list, currentSong.index).index,
								link: nextSong(currentSong.list, currentSong.index).link,
							})
						}
					>
						<img src={nextIcon} alt='next' />
					</Button>
				</div>

				<div
					className={`${
						currentSession.name ? 'visible' : 'invisible'
					} flex items-center text-sm italic bg-transparent-b-50 backdrop-blur-sm rounded-[20px] py-1.5 px-4 cursor-pointer`}
					onClick={() => setDraggableModalType({ ...draggableModalType, tasks: true })}
				>
					<p className='opacity-50'>{currentSession.name} / </p>
					<img src={clockIcon} alt='clock' className='w-[18px] h-[18px] mx-2.5' />
					<p className='opacity-50'>
						{isBreak ? convertTime(breakTime) : convertTime(sessionTime)}
					</p>
				</div>
			</div>

			<audio
				ref={mainSongRef}
				src={currentSong.link}
				preload='auto'
				// autoPlay
				onEnded={() =>
					setCurrentSong({
						...currentSong,
						index: nextSong(currentSong.list, currentSong.index).index,
						link: nextSong(currentSong.list, currentSong.index).link,
					})
				}
			/>
			{NOISE_LINKS.map((link, i) => (
				<audio
					key={i}
					src={link}
					ref={(el) => {
						noisesRef.current[i] = el;
					}}
					autoPlay
					loop
					muted
				/>
			))}
			<audio ref={alarmRef} src={alarmLink} preload='auto' loop autoPlay={alarmOn} />
		</div>
	);
}
