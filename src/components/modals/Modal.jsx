import React, { useContext } from 'react';
import { About, Contact, Profile, Share, Tutorial, Upgrade } from '..';
import { AppContext } from '../../context/AppProvider';

export default function Modal() {
	const { modalType, setModalType } = useContext(AppContext);

	return (
		<>
			{modalType && (
				<div
					className={`absolute inset-0 flex justify-center items-center animate-fadeIn z-50 ${
						modalType === 'tutorial'
							? 'bg-transparent-b-70 backdrop-blur-xl'
							: 'bg-transparent-b-50'
					}`}
				>
					<div
						className='absolute inset-0 z-40'
						onClick={() => {
							modalType !== 'tutorial' && modalType !== 'about' && setModalType(null);
						}}
					/>
					<div className='max-h-full overflow-y-auto z-50'>
						{modalType === 'tutorial' && <Tutorial />}
						{modalType === 'upgrade' && <Upgrade />}
						{modalType === 'contact' && <Contact />}
						{modalType === 'about' && <About />}
						{modalType === 'profile' && <Profile />}
						{modalType === 'share' && <Share />}
					</div>
				</div>
			)}
		</>
	);
}
