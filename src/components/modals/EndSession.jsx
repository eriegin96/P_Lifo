import React, { useContext } from 'react';

import { Button } from '..';
import { checkIcon, xIcon } from '../../assets/icons';
import { AppContext } from '../../context/AppProvider';
import { convertTime } from '../../utils/convertTime';

export default function EndSession() {
	const { setModalType, currentSession } = useContext(AppContext);

	return (
		<div className='w-full h-screen z-10 overflow-auto'>
			<div className='h-9/10 w-[400px] m-auto flex flex-col items-center overflow-x-hidden'>
				<h1 className='w-full mt-8 mb-4 text-primary text-5xl font-bold'>Good Job!</h1>
				<div className='w-full text-left'>
					<h3 className='text-3xl font-bold'>{currentSession.name}</h3>
					<div className='flex my-2 text-sm'>
						<p className='grow'>Length:</p>
						<time className='text-primary'>{convertTime(currentSession.time)}</time>
					</div>
					<div className='flex my-2 text-sm'>
						<p className='grow'>Completed Pomodoros:</p>
						<time className='text-primary'>{currentSession.pomodorosCount}</time>
					</div>
					<div className='flex my-2 text-sm'>
						<p className='grow'>Breaks taken:</p>
						<time className='text-primary'>{currentSession.breaksCount}</time>
					</div>
				</div>

				<div className='h-[300px] w-full my-2 text-left overflow-auto'>
					<div className='my-4'>
						<div className='my-4 flex items-center'>
							<h5 className='text-lg font-semibold'>Completed</h5>
							<img src={checkIcon} alt='check' className='mx-4' />
						</div>
						{currentSession.completedTasks.length === 0 ? (
							<p className='text-sm opacity-50'>None</p>
						) : (
							<>
								{currentSession.completedTasks.map((item, i) => (
									<div
										key={i}
										className='my-1 py-2 px-4 bg-bg-200 rounded-lg border border-transparent-w-20'
									>
										{item}
									</div>
								))}
							</>
						)}
					</div>

					<div className='mt-4'>
						<div className='my-4 flex items-center'>
							<h5 className='text-lg font-semibold'>Uncompleted</h5>
							<img src={xIcon} alt='check' className='mx-4' />
						</div>
						{currentSession.uncompletedTasks.length === 0 ? (
							<p className='text-sm opacity-50'>None</p>
						) : (
							<>
								{currentSession.uncompletedTasks.map((item, i) => (
									<div
										key={i}
										className='my-1 py-2 px-4 bg-bg-200 rounded-lg border border-transparent-w-20'
									>
										{item}
									</div>
								))}
							</>
						)}
					</div>
				</div>

				<Button
					className='w-full my-4 px-4 py-1 bg-primary text-black text-base font-semibold rounded-full'
					onClick={() => setModalType(null)}
				>
					Done
				</Button>

				<p className='text-sm opacity-50'>You can find this recap in your session's history</p>
			</div>
		</div>
	);
}
