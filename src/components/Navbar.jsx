import React, { useContext, useState } from 'react';
import Switch from 'react-switch';

import { logoImg } from '../assets/images';
import { moonIcon, sunIcon, fullscreenIcon, profileIcon } from '../assets/icons';
import { AppContext } from '../context/AppProvider';
import { Button } from '.';

export default function Navbar() {
	const { fullscreen, setFullscreen, setModalType } = useContext(AppContext);
	const [checked, setChecked] = useState(true);

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

	return (
		<div className='w-screen px-12 h-20 pt-3 flex items-center justify-between'>
			<img src={logoImg} alt='logo' className='h-[100px]' />

			{!fullscreen && (
				<div className='flex items-center'>
					<Button
						className='p-[18px] font-bold text-md'
						activeButton
						onClick={() => setModalType('tutorial')}
					>
						How it works
					</Button>
					<Button
						className='p-[18px] font-bold text-md'
						activeButton
						onClick={() => setModalType('upgrade')}
					>
						Upgrade
					</Button>
					<Button
						className='p-[18px] font-bold text-md'
						activeButton
						onClick={() => setModalType('contact')}
					>
						Contact us
					</Button>
					<div className='group relative'>
						<Button className='p-[18px] font-bold text-md' activeButton>
							More
						</Button>

						<div className='invisible group-hover:visible absolute min-w-[120px] top-full left-1/2 transform -translate-x-1/2 flex flex-col  items-center bg-transparent-w-20 text-sm py-2 px-4 rounded-lg gap-y-1 font-semibold text-center shadow-md group-hover:animate-fadeIn animate-fadeOut'>
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
				<div className='transition-all duration-300 ease-in hover:opacity-50'>
					<Switch
						onChange={() => setChecked(!checked)}
						checked={checked}
						handleDiameter={26}
						offColor='#24242f'
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

				<Button className='mx-4' onClick={toggleFullscreen}>
					<img src={fullscreenIcon} alt='full-screen' />
				</Button>

				<Button onClick={() => setModalType('profile')}>
					<img src={profileIcon} alt='profile' />
				</Button>

				<Button
					className='mx-4 py-1 px-3 bg-transparent-w-10 border border-transparent rounded-full text-xs'
					onClick={() => setModalType('share')}
				>
					Share
				</Button>
			</div>
		</div>
	);
}
