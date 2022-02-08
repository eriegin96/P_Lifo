import React, { useContext, useEffect, useRef, useState } from 'react';
import { Tab } from '@headlessui/react';

import { Button } from '..';
import { AppContext } from '../../context/AppProvider';
import { closeIcon } from '../../assets/icons';

export default function Session() {
	const { draggableModalType, setDraggableModalType, currentSession } = useContext(AppContext);
	const [input, setInput] = useState(currentSession.name);

	const startSession = () => {
		localStorage.setItem('session', input);
		setInput('');
		setDraggableModalType({ ...draggableModalType, session: false, tasks: true });
	};

	return (
		<div className='absolute top-32 left-1/2 transform -translate-x-1/2 animate-fadeIn'>
			<div className='p-6 w-[400px] flex flex-col justify-center items-center rounded-2xl bg-black'>
				<Button
					className='absolute top-4 right-4'
					onClick={() => {
						setDraggableModalType({ ...draggableModalType, session: false });
					}}
				>
					<img src={closeIcon} alt='close' />
				</Button>

				<h3 className='handle w-full text-3xl font-bold text-center cursor-move'>Start Session</h3>
				<Tab.Group>
					<Tab.List className='w-full mt-6 my-5 p-2 flex items-center bg-bg-200 rounded-full'>
						<Tab
							className={({ selected }) =>
								`w-1/2 text-sm font-medium ${
									selected ? 'py-1.5 px-6 rounded-full bg-primary text-black' : 'text-gray-500'
								}`
							}
						>
							New session
						</Tab>
						<Tab
							className={({ selected }) =>
								`w-1/2 text-sm font-medium ${
									selected ? 'py-1.5 px-6 rounded-full bg-primary text-black' : 'text-gray-500'
								}`
							}
						>
							Saved templates
						</Tab>
					</Tab.List>
					<Tab.Panels className='mb-4'>
						<Tab.Panel>
							<label htmlFor='session' className='text-white opacity-50 text-sm'>
								Insert a session name
							</label>
							<input
								value={input}
								placeholder='Session name'
								onChange={(e) => setInput(e.target.value)}
								type='text'
								id='session'
								className='my-2 py-2 px-4 w-full bg-bg-200 rounded-xl'
								required
							/>
						</Tab.Panel>
						<Tab.Panel>Content 2</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>

				<Button
					className='min-w-[120px] flex justify-center items-center p-2 bg-primary font-semibold text-md text-black rounded-full'
					onClick={startSession}
				>
					Start
				</Button>
			</div>
		</div>
	);
}
