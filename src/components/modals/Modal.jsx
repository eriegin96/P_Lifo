import React, { Fragment, useContext } from 'react';
import { Transition, Dialog } from '@headlessui/react';

import { About, Contact, Profile, Share, Tutorial, Upgrade } from '..';
import { AppContext } from '../../context/AppProvider';
import EndSession from './EndSession';

export default function Modal() {
	const { modalType, setModalType } = useContext(AppContext);

	return (
		<Transition show={!!modalType} as={Fragment}>
			<Dialog
				as='div'
				className='fixed inset-0 z-50 overflow-y-auto'
				onClose={() => setModalType(null)}
			>
				<div className='min-h-screen text-center'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay
							className={`fixed inset-0 ${
								['tutorial', 'about', 'end-session'].includes(modalType)
									? 'bg-transparent-b-70 backdrop-blur-xl'
									: 'bg-transparent-b-50'
							}`}
						/>
					</Transition.Child>

					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='min-h-screen flex justify-center items-center text-white z-20'>
							{modalType === 'tutorial' && <Tutorial />}
							{modalType === 'upgrade' && <Upgrade />}
							{modalType === 'contact' && <Contact />}
							{modalType === 'about' && <About />}
							{modalType === 'profile' && <Profile />}
							{modalType === 'share' && <Share />}
							{modalType === 'end-session' && <EndSession />}
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}
