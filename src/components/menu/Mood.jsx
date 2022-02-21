import React, { useContext } from 'react';
import ReactSlider from 'react-slider';
import { Button } from '..';

import {
	sleepyIcon,
	jazzyIcon,
	chillIcon,
	volumeMinIcon,
	volumeMaxIcon,
	bookmarkIcon,
} from '../../assets/icons';
import { SLEEPY_LINKS, CHILL_LINKS, JAZZY_LINKS, NOISE_ICONS } from '../../constants';
import { AppContext } from '../../context/AppProvider';
import { AuthContext } from '../../context/AuthProvider';
import { updateUser } from '../../firebase/services';
import { randomMainSong } from '../../utils/randomMainSong';

function MoodItem({ iconSrc, label, className, isActive, handleClick }) {
	return (
		<div
			className='relative h-[84px] w-[84px] bg-bg-200 rounded-xl cursor-pointer'
			onClick={handleClick}
		>
			<div className={`absolute w-[150px] h-[150px] -top-12 pointer-events-none ${className}`}>
				<img
					src={iconSrc}
					alt='mood-icon'
					className={`h-full w-full transition duration-200 ease-out ${
						isActive ? 'opacity-100 brightness-100' : 'opacity-10 brightness-200'
					}`}
				/>
			</div>
			<p
				className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 font-semibold transition duration-200 ease-out ${
					isActive ? 'opacity-100 brightness-100' : 'opacity-10 brightness-200'
				}`}
			>
				{label}
			</p>
		</div>
	);
}

export default function Mood() {
	const {
		user: { uid },
	} = useContext(AuthContext);
	const { mainSongRef, noisesRef, currentSong, setCurrentSong, setIsPlaying, background } =
		useContext(AppContext);

	const handleMoodType = (type) => {
		let newSong;
		setIsPlaying(true);
		mainSongRef.current.autoplay = true;

		switch (type) {
			case 'sleepy':
				updateUser(uid, { background: { ...background, mood: 'sleepy' } });
				newSong = randomMainSong(SLEEPY_LINKS, currentSong.index);
				setCurrentSong({
					...currentSong,
					list: SLEEPY_LINKS,
					index: newSong.index,
					link: newSong.link,
				});
				break;

			case 'jazzy':
				updateUser(uid, { background: { ...background, mood: 'jazzy' } });
				newSong = randomMainSong(JAZZY_LINKS, currentSong.index);
				setCurrentSong({
					...currentSong,
					list: JAZZY_LINKS,
					index: newSong.index,
					link: newSong.link,
				});
				break;

			case 'chill':
				updateUser(uid, { background: { ...background, mood: 'chill' } });
				newSong = randomMainSong(CHILL_LINKS, currentSong.index);
				setCurrentSong({
					...currentSong,
					list: CHILL_LINKS,
					index: newSong.index,
					link: newSong.link,
				});
				break;

			default:
				break;
		}
	};

	return (
		<div>
			<div className='mb-4 flex justify-between items-center'>
				<h4 className='font-bold text-xl'>Mood</h4>
				<Button className='py-1.5 px-4 flex items-center border border-[#5293f3] rounded-full bg-[rgba(82,147,243,.1)]'>
					<img src={bookmarkIcon} alt='bookmark' className='mr-2' />
					Save Template
				</Button>
			</div>
			<div className='my-4 flex justify-between items-center'>
				<MoodItem
					isActive={background.mood === 'sleepy'}
					iconSrc={sleepyIcon}
					label='Sleepy'
					className='-left-7'
					handleClick={() => handleMoodType('sleepy')}
				/>
				<MoodItem
					isActive={background.mood === 'jazzy'}
					iconSrc={jazzyIcon}
					label='Jazzy'
					className='-left-7'
					handleClick={() => handleMoodType('jazzy')}
				/>
				<MoodItem
					isActive={background.mood === 'chill'}
					iconSrc={chillIcon}
					label='Chill'
					className='-left-8'
					handleClick={() => handleMoodType('chill')}
				/>
			</div>

			<div className='my-8 flex justify-between items-center'>
				<img src={volumeMinIcon} alt='volume-min' className='relative -top-1 left-1' />

				<ReactSlider
					className='h-3 w-[200px] bg-bg-200 rounded-full'
					defaultValue={mainSongRef.current.volume * 100}
					onChange={(value) => {
						mainSongRef.current.volume = value / 100;
					}}
					renderTrack={(props, state) => (
						<div
							{...props}
							className={`inset-y-0 rounded-full ${state.index === 0 ? 'bg-primary' : ''}`}
							index={state.index}
						/>
					)}
					renderThumb={(props) => (
						<div
							{...props}
							className='-top-0.5 h-4 w-4 bg-white rounded-full cursor-pointer outline-none'
						/>
					)}
				/>

				<img src={volumeMaxIcon} alt='volume-max' className='relative -top-[3px]' />
			</div>

			<div>
				<h4 className='font-bold my-4 text-xl'>Background noises</h4>
				<div className='h-[300px] overflow-y-auto'>
					{NOISE_ICONS.map((noise, index) => (
						<div key={index} className='my-4 flex justify-between items-center'>
							<p className='text-sm opacity-40'>{noise.label}</p>

							<ReactSlider
								className='h-6 w-[148px] bg-bg-200 rounded-full mr-1'
								defaultValue={0}
								onBeforeChange={() => {
									const thisAudio = noisesRef.current[index];
									if (thisAudio.paused) thisAudio.play();
									if (thisAudio.muted) thisAudio.muted = false;
								}}
								onChange={(value) => {
									noisesRef.current[index].volume = value / 100;
								}}
								renderTrack={(props, state) => (
									<div
										{...props}
										className={`inset-y-0 rounded-full ${state.index === 0 ? 'bg-primary' : ''}`}
										index={state.index}
									/>
								)}
								renderThumb={(props) => (
									<div {...props} className='h-6 w-6 rounded-full cursor-pointer outline-none'>
										<img src={noise.icon} alt='icon' />
									</div>
								)}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
