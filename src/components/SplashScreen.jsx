import React from 'react';
import { logoImg } from '../assets/images';

export default function SplashScreen() {
	return (
		<div className='min-h-screen bg-bg flex justify-center items-center'>
			<img src={logoImg} alt='logo' width={300} />
		</div>
	);
}
