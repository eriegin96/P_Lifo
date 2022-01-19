import React, { useContext } from 'react';
import ReactSlider from 'react-slider';

import sleepyIcon from '../../assets/icons/sleepy.svg';
import jazzyIcon from '../../assets/icons/jazzy.svg';
import chillIcon from '../../assets/icons/chill.svg';
import volumeMinIcon from '../../assets/icons/volume-min.svg';
import volumeMaxIcon from '../../assets/icons/volume-max.svg';
import { NOISE_ICONS } from '../../constants';
import { AppContext } from '../../context/AppProvider';

function MoodItem({ iconSrc, label, className }) {
	return (
		<div className='relative h-[84px] w-[84px] bg-bg-200 rounded-xl cursor-pointer'>
			<div className={`absolute w-[150px] h-[150px] -top-12 pointer-events-none ${className}`}>
				<img src={iconSrc} alt='mood-icon' className='h-full w-full ' />
			</div>
			<p className='absolute bottom-2 left-1/2 transform -translate-x-1/2 font-semibold'>{label}</p>
		</div>
	);
}

export default function Mood() {
	const { mainSoundRef, noisesRefs } = useContext(AppContext);

	return (
		<div>
			<h4 className='font-bold my-4 text-xl'>Mood</h4>
			<div className='my-4 flex justify-between items-center'>
				<MoodItem iconSrc={sleepyIcon} label='Sleepy' className='-left-7' />
				<MoodItem iconSrc={jazzyIcon} label='Jazzy' className='-left-7' />
				<MoodItem iconSrc={chillIcon} label='Chill' className='-left-8' />
			</div>

			<div className='my-8 flex justify-between items-center'>
				<img src={volumeMinIcon} alt='volume-min' className='relative -top-1 left-1' />

				<ReactSlider
					className='h-3 w-[200px] bg-bg-200 rounded-full'
					defaultValue={50}
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
									const thisAudio = noisesRefs.current[index];
									if (thisAudio.paused) thisAudio.play();
									if (thisAudio.muted) thisAudio.muted = false;
								}}
								onChange={(value) => {
									noisesRefs.current[index].volume = value / 100;
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
