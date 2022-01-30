import React, { useContext, useEffect } from 'react';
import { NOISE_LINKS } from '../constants/links/noises';
import { AppContext } from '../context/AppProvider';

import { playIcon, pauseIcon, prevIcon, nextIcon } from '../assets/icons';
import { Button } from '.';
import { nextSong, prevSong } from '../utils/randomMainSong';

export default function Audio() {
	const { mainSongRef, noisesRefs, isPlaying, setIsPlaying, currentSong, setCurrentSong } =
		useContext(AppContext);

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
			<div className='p-8 pb-4 relative flex justify-center items-center'>
				<p className='absolute left-20 opacity-50 text-sm'>Music by - lofi.co 2021 ©</p>
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
