import React, { useContext, useState } from 'react';
import { Menu, Navbar, Background, Audio, Modal } from './components';

function App() {
	return (
		<div className='relative bg-green-500 text-white min-h-screen'>
			<Background />
			<Navbar />
			<Menu />
			<Audio />
			<Modal />
		</div>
	);
}

export default App;
