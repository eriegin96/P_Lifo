import React, { useContext } from 'react';
import { Menu, Navbar, Background, Audio, Modal, DraggableModal, Login } from './components';
import { AuthContext } from './context/AuthProvider';

function App() {
	const { uid } = useContext(AuthContext);

	return (
		<div className='relative bg-bg text-white min-h-screen overflow-auto'>
			{uid ? (
				<>
					<Navbar />
					<Background />
					<Menu />
					<Audio />
					<Modal />
					<DraggableModal />
				</>
			) : (
				<Login />
			)}
		</div>
	);
}

export default App;
