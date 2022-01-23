import React, { useContext } from 'react';

import { Button } from '..';
import { AppContext } from '../../context/AppProvider';
import { closeIcon, instagramIcon, twitterIcon, mailIcon } from '../../assets/icons';
import { ABOUT_US_1, ABOUT_US_2 } from '../../constants';

export default function About() {
	const { setModalType } = useContext(AppContext);

	return (
		<div className='w-full h-full animate-fadeIn'>
			<Button className='absolute top-8 right-8' onClick={() => setModalType(null)}>
				<img src={closeIcon} alt='close' />
			</Button>

			{/* About section */}

			<div className='h-full flex flex-col justify-center items-center text-center w-4/5 m-auto'>
				<h3 className='font-bold text-4xl my-8'>About lofi.co</h3>
				<p className='text-md mx-16'>
					{ABOUT_US_1}
					<br />
					<br />
					{ABOUT_US_2}
				</p>

				<div className='my-12 flex items-center justify-between'>
					<a
						href='https://www.instagram.com/lofi/'
						target='_blank'
						rel='noreferrer'
						className='flex items-center py-4 px-8 m-4 bg-bg-300 rounded-lg cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 ease-in'
					>
						<img src={instagramIcon} alt='instagram' />
						<h4 className='font-bold mx-4'>Instagram</h4>
					</a>
					<a
						href='https://twitter.com/lofidotco'
						target='_blank'
						rel='noreferrer'
						className='flex items-center py-4 px-8 m-4 bg-bg-300 rounded-lg cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 ease-in'
					>
						<img src={twitterIcon} alt='twitter' />
						<h4 className='font-bold mx-4'>Twitter</h4>
					</a>
					<div className='flex items-center py-4 px-8 m-4 bg-bg-300 rounded-lg cursor-pointer hover:scale-105 hover:opacity-80 transition-all duration-200 ease-in'>
						<img src={mailIcon} alt='mail' />
						<h4 className='font-bold mx-4'>hello@lofi.co</h4>
					</div>
				</div>
			</div>
		</div>
	);
}
