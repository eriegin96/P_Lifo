import React, { useContext } from 'react';
import Switch from 'react-switch';

import { logoImg } from '../assets/images';
import {
	moonIcon,
	sunIcon,
	fullscreenIcon,
	profileIcon,
	rainyIcon,
	sunnyIcon,
} from '../assets/icons';
import { AppContext } from '../context/AppProvider';
import { Button } from '.';
import { newBackground } from '../utils';
import { updateUser } from '../firebase/services';
import { AuthContext } from '../context/AuthProvider';

export default function Navbar() {
	const { uid } = useContext(AuthContext);
	const { fullscreen, setFullscreen, setModalType, background } = useContext(AppContext);

	const toggleFullscreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
			setFullscreen(true);
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
				setFullscreen(false);
			}
		}
	};

	const handleChangeBg = (mode) => {
		const condition = {
			set: background.set,
			scene: background.scene,
			day: mode === 'day' ? !background.day : background.day,
			rainy: mode === 'rainy' ? !background.rainy : background.rainy,
		};
		const newBg = newBackground(background, condition);

		updateUser(uid, { background: newBg });
	};

	return (
		<div className='fixed w-screen h-20 z-10'>
			<div className='absolute inset-0 navbar backdrop-blur backdrop-brightness-50' />

			<div className='relative w-full h-full px-12 pt-3 flex flex-wrap items-center justify-between'>
				<img src={logoImg} alt='logo' className='h-[100px]' />

				{!fullscreen && (
					<div className='flex items-center'>
						<Button
							className='p-[18px] font-bold text-lg'
							activeButton
							onClick={() => setModalType('tutorial')}
						>
							How it works
						</Button>
						<Button
							className='p-[18px] font-bold text-lg'
							activeButton
							onClick={() => setModalType('upgrade')}
						>
							Upgrade
						</Button>
						<Button
							className='p-[18px] font-bold text-lg'
							activeButton
							onClick={() => setModalType('contact')}
						>
							Contact us
						</Button>
						<div className='group relative'>
							<Button className='p-[18px] font-bold text-lg' activeButton>
								More
							</Button>

							<div className='invisible group-hover:visible absolute min-w-[140px] top-full left-1/2 transform -translate-x-1/2 flex flex-col items-center bg-transparent-w-20 text-md py-2 px-4 rounded-lg gap-y-1 font-semibold text-center shadow-md group-hover:animate-fadeIn animate-fadeOut'>
								<Button className='w-full font-semibold' onClick={() => setModalType('about')}>
									About Lofi.co
								</Button>
								<a
									href='https://github.com/eriegin96'
									target='_blank'
									rel='noreferrer'
									className='w-full hover:opacity-50 duration-200 ease-in'
								>
									My portfolio
								</a>
							</div>
						</div>
					</div>
				)}

				<div className='flex items-center'>
					{['chill', 'cafe'].includes(background.set) && (
						<>
							<div className='transition-all duration-300 ease-in hover:opacity-50 '>
								<Switch
									onChange={() => handleChangeBg('day')}
									checked={background.day}
									handleDiameter={26}
									offColor='#545459'
									onColor='#f3a952'
									height={30}
									width={62}
									activeBoxShadow='0px 0px 0px 0px transparent'
									uncheckedIcon={
										<div className='flex justify-center items-center h-full '>
											<img src={moonIcon} alt='moon' />
										</div>
									}
									checkedIcon={
										<div className='flex justify-center items-center h-full '>
											<img src={sunIcon} alt='sun' />
										</div>
									}
								/>
							</div>

							<div className='transition-all duration-300 ease-in hover:opacity-50 ml-4'>
								<Switch
									onChange={() => handleChangeBg('rainy')}
									checked={background.rainy}
									handleDiameter={26}
									offColor='#545459'
									onColor='#f3a952'
									height={30}
									width={62}
									activeBoxShadow='0px 0px 0px 0px transparent'
									uncheckedIcon={
										<div className='flex justify-center items-center h-full '>
											<img src={rainyIcon} alt='rainy' />
										</div>
									}
									checkedIcon={
										<div className='relative -top-0.5 flex justify-center items-center h-full '>
											<img src={sunnyIcon} alt='sunny' />
										</div>
									}
								/>
							</div>
						</>
					)}

					<Button className='mx-4' onClick={toggleFullscreen}>
						<img src={fullscreenIcon} alt='full-screen' />
					</Button>

					<Button onClick={() => setModalType('profile')}>
						<img src={profileIcon} alt='profile' />
					</Button>

					<Button
						className='mx-4 py-1 px-3 bg-transparent-w-10 border border-transparent-w-30 rounded-full text-xs'
						onClick={() => setModalType('share')}
					>
						Share
					</Button>
				</div>
			</div>
		</div>
	);
}
