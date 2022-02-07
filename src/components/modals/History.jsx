import React, { useContext, useState } from 'react';

import { Button } from '..';
import { AppContext } from '../../context/AppProvider';
import { activityIcon, closeIcon, titleNotesIcon } from '../../assets/icons';

const SESSIONS = [
	{ name: 'study 1', time: '3,492', date: '05/02/2022' },
	{ name: 'study 2', time: '99', date: '06/02/2022' },
	{ name: 'study 3', time: '02', date: '07/02/2022' },
];

// TODO: check CSS
export default function History() {
	const { draggableModalType, setDraggableModalType } = useContext(AppContext);
	const [newTab, setNewTab] = useState(true);

	return (
		<div className='absolute top-8 left-1/2 transform -translate-x-1/2'>
			<div className='p-6 w-[440px] flex flex-col justify-center items-center rounded-3xl bg-black'>
				<Button
					className='absolute top-4 right-4'
					onClick={() => {
						setDraggableModalType({ ...draggableModalType, history: false });
					}}
				>
					<img src={closeIcon} alt='close' />
				</Button>

				<div className='relative w-5/6 handle cursor-move self-start'>
					<h3 className='text-3xl font-bold'>Logs</h3>
					<img
						src={titleNotesIcon}
						alt='title-draw'
						className='absolute -bottom-0.5 pointer-events-none w-[66px]'
					/>
				</div>

				<div className='w-full mt-6 mx-8 py-3 px-6 bg-bg-200 rounded-2xl flex'>
					<div className='my-4'>
						<img src={activityIcon} alt='activity' className='' />
					</div>
					<div className='grow flex flex-col mx-4'>
						<h4 className='my-2 mx-4 text-xl font-semibold'>Activity</h4>
						<div className='w-full flex justify-between my-2 mx-4'>
							<div>
								<p className='text-sm opacity-50'>Total Sessions</p>
								<h4 className='text-xl font-semibold'>4</h4>
							</div>
							<div>
								<p className='text-sm opacity-50'>Total Hours</p>
								<h4 className='text-xl font-semibold'>117</h4>
							</div>
							<div>
								<p className='text-sm opacity-50'>Day Streak</p>
								<h4 className='text-xl font-semibold'>4</h4>
							</div>
						</div>
					</div>
				</div>

				<div className='w-full mt-8'>
					<h4 className='text-xl font-semibold'>Sessions</h4>
					<div className='w-full h-[300px] overflow-auto rounded-b-xl'>
						{SESSIONS.map((session, i) => (
							<div key={i} className='mt-5 p-5 bg-bg-200 rounded-xl border border-transparent-w-20'>
								<h5 className='mb-3 text-2xl font-medium'>{session.name}</h5>
								<div className='w-full flex'>
									<h2 className='grow font-bold text-primary'>
										<time className='text-5xl'>{session.time}</time>
										<span className='ml-2 text-lg'>min</span>
									</h2>
									<time className='self-end opacity-50 text-sm'>{session.date}</time>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
