import React, { useContext } from 'react';
import { Tab } from '@headlessui/react';

import { Button } from '..';
import { AppContext } from '../../context/AppProvider';
import { closeIcon } from '../../assets/icons';

// TODO: check CSS
export default function Session() {
	const { draggableModalType, setDraggableModalType } = useContext(AppContext);

	return (
		<div className='absolute top-32 left-1/2 transform -translate-x-1/2 animate-fadeIn'>
			<div className='p-6 w-[440px] flex flex-col justify-center items-center rounded-2xl bg-black'>
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
					<Tab.List className='w-full my-6 p-2 flex items-center bg-bg-200 rounded-full'>
						<Tab
							className={({ selected }) =>
								selected
									? 'w-1/2 py-1.5 px-6 rounded-full bg-primary text-black font-semibold'
									: 'w-1/2 text-gray-500 font-semibold'
							}
						>
							New session
						</Tab>
						<Tab
							className={({ selected }) =>
								selected
									? 'w-1/2 py-1.5 px-6 rounded-full bg-primary text-black font-semibold'
									: 'w-1/2 text-gray-500 font-semibold'
							}
						>
							Saved templates
						</Tab>
					</Tab.List>
					<Tab.Panels className='mb-4'>
						<Tab.Panel>
							<label htmlFor='session' className='text-gray-400 font-semibold'>
								Insert a session name
							</label>
							<input
								type='text'
								id='session'
								className='my-2 py-2 px-4 w-full bg-bg-200 rounded-xl'
								required
							/>
						</Tab.Panel>
						<Tab.Panel>Content 2</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>

				<Button className='min-w-[120px] flex justify-center items-center p-2 bg-primary font-semibold text-md text-black rounded-full'>
					Start
				</Button>
			</div>
		</div>
	);
}
