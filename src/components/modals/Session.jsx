import React, { useContext, useState } from 'react';

import { Button } from '..';
import { AppContext } from '../../context/AppProvider';
import { closeIcon } from '../../assets/icons';
import { addSession, updateUser } from '../../firebase/services';
import { AuthContext } from '../../context/AuthProvider';

export default function Session() {
	const { uid } = useContext(AuthContext);
	const { draggableModalType, setDraggableModalType, currentSession, setModalType } =
		useContext(AppContext);
	const [input, setInput] = useState(currentSession.name);

	const startSession = () => {
		if (input) {
			updateUser(uid, { currentSession: { ...currentSession, name: input } });
			setInput('');
			setDraggableModalType({ ...draggableModalType, session: false, tasks: true });
		}
	};

	const handleEndSession = () => {
		const completedTasks = currentSession.taskList
			.filter((task) => task.done === true)
			.map((task) => task.content);
		const uncompletedTasks = currentSession.taskList
			.filter((task) => task.done === false)
			.map((task) => task.content);

		addSession(uid, {
			name: currentSession.name,
			time: currentSession.pomodoroTime + currentSession.breakTime + 1000,
			completedTasks,
			uncompletedTasks,
		});
		updateUser(uid, {
			currentSession: { ...currentSession, completedTasks, uncompletedTasks },
		}).then(() => setModalType('end-session'));
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

				<h3 className='handle w-full text-3xl font-bold text-center cursor-move'>Session</h3>

				{currentSession.name ? (
					<div className='w-full my-4 text-center'>
						<p className='text-white opacity-50 text-sm'>Do you want to end this session?</p>
						<p className='my-2 py-2 px-4 w-full bg-bg-200 rounded-xl'>{input}</p>
					</div>
				) : (
					<div className='my-4'>
						<label htmlFor='session' className='text-white opacity-50 text-sm'>
							Insert a session name
						</label>
						<input
							value={input}
							placeholder='Session name'
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') startSession();
							}}
							type='text'
							id='session'
							className='my-2 py-2 px-4 w-full bg-bg-200 rounded-xl'
							required
						/>
					</div>
				)}

				{currentSession.name ? (
					<Button
						className={`min-w-[120px] p-2 border border-[#5b5a67] text-sm rounded-full`}
						onClick={handleEndSession}
					>
						End session
					</Button>
				) : (
					<Button
						className='min-w-[120px] flex justify-center items-center p-2 bg-primary font-semibold text-md text-black rounded-full'
						onClick={startSession}
					>
						Start session
					</Button>
				)}
			</div>
		</div>
	);
}
