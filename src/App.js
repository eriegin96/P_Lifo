import React from 'react';
import { Menu, Navbar, Background, Audio, Modal } from './components';

function App() {
	return (
		<div className='relative bg-bg text-white min-h-screen'>
			<Navbar />
			<Background />
			<Menu />
			<Audio />
			<Modal />
		</div>
	);
}

export default App;
