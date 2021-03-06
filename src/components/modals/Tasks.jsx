import React, { useContext } from 'react';
import { Tab } from '@headlessui/react';

import { Button } from '..';
import { AppContext } from '../../context/AppProvider';
import { closeIcon } from '../../assets/icons';

// TODO: check CSS
export default function Tasks() {
	const { draggableModalType, setDraggableModalType } = useContext(AppContext);

	return (
		<div className='absolute top-10 left-1/2 transform -translate-x-1/2 animate-fadeIn'>
			<div className='p-6 w-[440px] flex flex-col justify-center items-center rounded-3xl bg-black'>
				<Button
					className='absolute top-4 right-4'
					onClick={() => {
						setDraggableModalType({ ...draggableModalType, tasks: false });
					}}
				>
					<img src={closeIcon} alt='close' />
				</Button>

				<h3 className='handle w-full text-3xl font-bold text-center cursor-move'>Timer & Tasks</h3>
				<Tab.Group>
					<Tab.List className='w-full my-6 p-2 flex items-center bg-bg-200 rounded-full'>
						<Tab
							className={({ selected }) =>
								selected
									? 'w-1/2 py-1.5 px-6 rounded-full bg-primary text-black text-sm font-semibold'
									: 'w-1/2 text-gray-500 font-semibold'
							}
						>
							Pomodoro
						</Tab>
						<Tab
							className={({ selected }) =>
								selected
									? 'w-1/2 py-1.5 px-6 rounded-full bg-primary text-black text-sm font-semibold'
									: 'w-1/2 text-gray-500 font-semibold'
							}
						>
							Break
						</Tab>
					</Tab.List>
					<Tab.Panels className='mb-4 w-full'>
						<Tab.Panel className='py-6 w-full flex flex-col items-center bg-bg-200 rounded-lg cursor-default'>
							<h4 className='text-4xl font-bold'>25:00</h4>
							<p className='text-gray-300 font-medium'>study session</p>
							<div className='my-4 flex justify-center items-center'>
								<Button className='py-1 px-8 bg-primary text-black font-medium rounded-full'>
									Start
								</Button>
								<div>Play</div>
							</div>
							<Button className='py-0.5 px-4 border border-white text-sm rounded-full'>
								End session
							</Button>
						</Tab.Panel>
						<Tab.Panel>Content 2</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>

				<div className='w-full mb-3 flex justify-between items-center'>
					<div>Tasks</div>
					<div className='flex items-center'>
						<Button className='border border-gray-900 rounded-full'>?</Button>
						<Button className='ml-1 border border-gray-900 rounded-full'>Setting</Button>
					</div>
				</div>

				<div className='w-full min-h-[80px] mb-4 flex flex-col items-center bg-bg-200 rounded-lg cursor-default'>
					empty
				</div>

				<Button className='min-w-[120px] flex justify-center items-center p-2 bg-primary font-semibold text-md text-black rounded-full'>
					Add Task
				</Button>
			</div>
		</div>
	);
}
