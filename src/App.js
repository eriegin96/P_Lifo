import React from 'react';
import { Menu, Navbar, Background, Audio, Modal, DraggableModal } from './components';

function App() {
	return (
		<div className='relative bg-bg text-white min-h-screen overflow-auto'>
			<Navbar />
			<Background />
			<Menu />
			<Audio />
			<Modal />
			<DraggableModal />
		</div>
	);
}

export default App;
