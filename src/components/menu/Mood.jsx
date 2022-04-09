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
	searchIcon,
} from '../../assets/icons';
import { SLEEPY_LINKS, CHILL_LINKS, JAZZY_LINKS, NOISE_ICONS } from '../../constants';
import { AppContext } from '../../context/AppProvider';
import { AuthContext } from '../../context/AuthProvider';
import { updateUser } from '../../firebase/services';
import { randomMainSong } from '../../utils';

function MoodItem({ iconSrc, label, iconClassName, textClassName, isActive, handleClick }) {
	return (
		<div
			className='relative flex items-center h-16 col-span-1 bg-bg-200 rounded-xl cursor-pointer group'
			onClick={handleClick}
		>
			<div
				className={`absolute w-[150px] h-[150px] -left-8 -top-12 pointer-events-none ${iconClassName}`}
			>
				<img
					src={iconSrc}
					alt='mood-icon'
					className={`h-full w-full transition duration-200 ease-out ${
						isActive ? 'opacity-100' : 'opacity-10 group-hover:opacity-50'
					}`}
				/>
			</div>
			<p
				className={`absolute font-semibold transition duration-200 ease-out ${
					isActive ? 'opacity-100' : 'opacity-10 group-hover:opacity-50'
				} ${textClassName}`}
			>
				{label}
			</p>
		</div>
	);
}

export default function Mood({ setMenuTab, initialTab }) {
	const { uid } = useContext(AuthContext);
	const {
		mainSongRef,
		noisesRef,
		currentSong,
		setCurrentSong,
		setIsPlaying,
		background,
		templates,
		draggableModalType,
		setDraggableModalType,
	} = useContext(AppContext);

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

	const saveTemplate = () => {
		if (!templates.includes(background.scene))
			updateUser(uid, { templates: [...templates, background.scene] });
	};

	return (
		<div className='max-h-[600px] overflow-y-auto overflow-x-hidden'>
			<div className='mb-4 flex justify-between items-center'>
				<h4 className='font-bold text-xl'>Mood</h4>
				{!templates.includes(background.scene) && (
					<Button
						className='py-1.5 px-4 flex items-center border border-[#5293f3] rounded-full bg-[rgba(82,147,243,.1)]'
						onClick={saveTemplate}
					>
						<img src={bookmarkIcon} alt='bookmark' className='mr-2' />
						Save Template
					</Button>
				)}
			</div>
			<div className='my-4 grid grid-cols-2 gap-y-2 gap-x-4 flex-wrap justify-between items-center'>
				<MoodItem
					isActive={background.mood === 'sleepy'}
					iconSrc={sleepyIcon}
					label='Sleepy'
					textClassName='left-20'
					handleClick={() => handleMoodType('sleepy')}
				/>
				<MoodItem
					isActive={background.mood === 'jazzy'}
					iconSrc={jazzyIcon}
					label='Jazzy'
					textClassName='left-[4.5rem]'
					handleClick={() => handleMoodType('jazzy')}
				/>
				<MoodItem
					isActive={background.mood === 'chill'}
					iconSrc={chillIcon}
					label='Chill'
					textClassName='left-20'
					handleClick={() => handleMoodType('chill')}
				/>
				<div
					className='relative flex items-center h-16 border-[3px] border-transparent-w-20 rounded-xl cursor-pointer group'
					onClick={() => {
						setDraggableModalType({ ...draggableModalType, search: true });
						setMenuTab(initialTab);
					}}
				>
					<img
						src={searchIcon}
						alt='search'
						className='h-8 w-8 absolute top-1/4 left-4 transition-all duration-200 ease-out opacity-100 group-hover:opacity-50'
					/>
					<p className='absolute right-4 font-semibold transition duration-200 ease-out opacity-100 group-hover:opacity-50'>
						Youtube
					</p>
				</div>
			</div>

			<div className='my-6 flex justify-between items-center'>
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
				<div className='max-h-[280px] border border-transparent-w-20 rounded-xl px-2 overflow-y-auto'>
					{NOISE_ICONS.map((noise, index) => (
						<div key={index} className='my-3 flex justify-between items-center'>
							<p className='text-sm opacity-40'>{noise.label}</p>

							<ReactSlider
								className='h-6 w-[148px] bg-bg-200 rounded-full mr-1'
								defaultValue={noisesRef.current[index].volume * 100}
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
