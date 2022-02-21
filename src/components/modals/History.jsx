import React, { useContext, useState } from 'react';

import { Button } from '..';
import { AppContext } from '../../context/AppProvider';
import {
	activityIcon,
	arrowLeftIcon,
	checkIcon,
	clockIcon,
	closeIcon,
	titleNotesIcon,
	xIcon,
} from '../../assets/icons';

const SESSIONS = [
	{
		id: '1',
		name: 'study 1',
		time: '3,492',
		date: '05/02/2022',
		completedTasks: ['123', '456', 'abc', '000'],
		uncompletedTasks: ['123', '456', 'abc', '000'],
	},
	{
		id: '2',
		name: 'study 2',
		time: '99',
		date: '06/02/2022',
		completedTasks: ['123', '456', 'abc', '000'],
		uncompletedTasks: ['123', '456', 'abc', '000'],
	},
	{
		id: '3',
		name: 'study 3',
		time: '02',
		date: '07/02/2022',
		completedTasks: ['123', '456', 'abc', '000'],
		uncompletedTasks: ['123', '456', 'abc', '000'],
	},
];

export default function History() {
	const { draggableModalType, setDraggableModalType } = useContext(AppContext);
	const [isDetail, setIsDetail] = useState(false);
	const [viewSession, setViewSession] = useState({});

	const viewDetail = (id) => {
		if (id) {
			setIsDetail(true);
			setViewSession(SESSIONS.find((session) => session.id === id));
		} else {
			setIsDetail(false);
			setViewSession({});
		}
	};

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

				{isDetail ? (
					<div className='w-full flex flex-col'>
						<div
							className='w-20 opacity-50 flex items-center cursor-pointer hover:opacity-100 duration-200 ease-out'
							onClick={() => viewDetail()}
						>
							<img src={arrowLeftIcon} alt='arrow' className='w-[14px] h-[14px]' />
							<span className='mx-2 text-base'>Back</span>
						</div>

						<div className='mx-4 flex'>
							<div className='my-4'>
								<img src={clockIcon} alt='clock' className='w-9 h-9' />
							</div>
							<div className='grow ml-10 flex flex-col'>
								<h4 className='my-2 text-xl font-semibold'>{viewSession.name}</h4>
								<div className='flex justify-between items-center'>
									<p className='text-sm my-2'>Date:</p>
									<time className='text-primary text-sm'>{viewSession.createdAt}</time>
								</div>
								<div className='flex justify-between items-center border-t border-transparent-w-20'>
									<p className='text-sm my-2'>Length:</p>
									<time className='text-primary text-sm'>{viewSession.time}</time>
								</div>
							</div>
						</div>

						<div className='h-[360px] w-full my-2 text-left overflow-auto'>
							<div className='my-4'>
								<div className='my-4 flex items-center'>
									<h5 className='text-lg font-semibold'>Completed Tasks</h5>
									<img src={checkIcon} alt='check' className='mx-4' />
								</div>
								<p className='text-sm opacity-50'>None</p>
								{viewSession.completedTasks.map((item, i) => (
									<div
										key={i}
										className='my-1 py-2 px-4 bg-bg-200 rounded-lg border border-transparent-w-20'
									>
										{item}
									</div>
								))}
							</div>

							<div className='mt-4'>
								<div className='my-4 flex items-center'>
									<h5 className='text-lg font-semibold'>Uncompleted Tasks</h5>
									<img src={xIcon} alt='check' className='mx-4' />
								</div>
								<p className='text-sm opacity-50'>None</p>
								{viewSession.uncompletedTasks.map((item, i) => (
									<div
										key={i}
										className='my-1 py-2 px-4 bg-bg-200 rounded-lg border border-transparent-w-20'
									>
										{item}
									</div>
								))}
							</div>
						</div>
					</div>
				) : (
					<>
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
									<div
										key={i}
										className='mt-5 p-5 bg-bg-200 rounded-xl border border-transparent-w-20 cursor-pointer hover:opacity-50 duration-200 ease-out'
										onClick={() => viewDetail(session.id)}
									>
										<h5 className='mb-3 text-2xl font-medium'>{session.name}</h5>
										<div className='w-full flex'>
											<h2 className='grow font-bold text-primary'>
												<time className='text-5xl'>{session.time}</time>
												<span className='ml-2 text-lg'>min</span>
											</h2>
											<time className='self-end opacity-50 text-sm'>{session.createdAt}</time>
										</div>
									</div>
								))}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
