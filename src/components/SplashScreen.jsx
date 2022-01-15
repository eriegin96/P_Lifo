import React from 'react';
import logo from '../assets/images/logo.gif';

export default function SplashScreen() {
	return (
		<div className='min-h-screen bg-bg flex justify-center items-center'>
			<img src={logo} alt='logo' width={300} />
		</div>
	);
}
