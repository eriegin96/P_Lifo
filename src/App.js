import React from 'react';
import { Menu, Navbar, Background, Audio, Modal } from './components';

function App() {
	return (
		<div className='relative bg-green-500 text-white min-h-screen'>
			<Navbar />
			<Background />
			<Menu />
			<Audio />
			<Modal />
		</div>
	);
}

export default App;
