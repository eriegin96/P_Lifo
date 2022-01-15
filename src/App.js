import React, { useContext, useState } from 'react';
import { Menu, Navbar, Background, Audio, Modal } from './components';
import { AuthContext } from './context/AuthProvider';

function App() {
	const [modalType, setModalType] = useState();

	return (
		<div className='relative bg-bg text-white min-h-screen'>
			<Background />
			<Navbar setModalType={setModalType} />
			<Menu />
			<Audio />
			<Modal type={modalType} setType={setModalType} />
		</div>
	);
}

export default App;
