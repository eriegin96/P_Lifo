import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';

import { Button } from '..';
import { AppContext } from '../../context/AppProvider';
import {
	arrowLeftIcon,
	binIcon,
	closeIcon,
	currentIcon,
	emptyIcon,
	minusIcon,
	plusIcon,
	settingIcon,
	skipIcon,
	threeDotsIcon,
	titleDrawIcon,
} from '../../assets/icons';
import { AuthContext } from '../../context/AuthProvider';
import Switch from 'react-switch';
import { Listbox, Transition } from '@headlessui/react';

export default function Tasks() {
	const {
		alarmOn,
		alarmList,
		alarmLink,
		setAlarmLink,
		setAlarmOn,
		draggableModalType,
		setDraggableModalType,
		isBreak,
		setIsBreak,
		isTimerPlaying,
		setIsTimerPlaying,
		sessionTime,
		setSessionTime,
		breakTime,
		setBreakTime,
		initSessionTime,
		setInitSessionTime,
		initBreakTime,
		setInitBreakTime,
		sessionName,
		sessionInterval,
	} = useContext(AppContext);

	const [isAddingTask, setIsAddingTask] = useState(false);
	const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('task-list')) ?? []);
	const [currentTask, setCurrentTask] = useState();
	const [settingMode, setSettingMode] = useState(false);
	const [selected, setSelected] = useState(alarmList.find((item) => item.link === alarmLink));
	const newTaskRef = useRef();

	useEffect(() => {
		setAlarmLink(selected.link);
	}, [selected]);

	const startSessionTimer = () => {
		// if (sessionInterval) clearInterval(sessionInterval);
		setIsTimerPlaying(true);
	};

	const stopSessionTimer = () => {
		clearInterval(sessionInterval);
		setIsTimerPlaying(false);
	};

	const skipTimer = () => {
		setIsBreak(!isBreak);

		if (!isBreak) setSessionTime(initBreakTime * 60);
		if (isBreak) setSessionTime(initSessionTime * 60);
	};

	const updateTask = (e, i) => {
		const newTaskList = [...taskList];
		newTaskList[i] = e.target.value;

		setTaskList(newTaskList);
		localStorage.setItem('task-list', JSON.stringify(newTaskList));
	};

	const deleteTask = (i) => {
		const newTaskList = [...taskList];
		newTaskList.splice(i, 1);

		setTaskList(newTaskList);
		localStorage.setItem('task-list', JSON.stringify(newTaskList));
	};

	const addNewTask = (e) => {
		if (e.key === 'Enter' && newTaskRef.current?.value) {
			// !: add to database
			const newTaskList = [...taskList, newTaskRef.current.value];
			localStorage.setItem('task-list', JSON.stringify(newTaskList));
			setTaskList(newTaskList);

			setIsAddingTask(false);
			newTaskRef.current.value = '';
		}
	};

	return (
		<div className='absolute max-h-screen top-4 left-1/2 transform -translate-x-1/2'>
			<div className='p-6 w-[440px] flex flex-col justify-center items-center rounded-3xl bg-black'>
				<Button
					className='absolute top-4 right-4'
					onClick={() => {
						setDraggableModalType({ ...draggableModalType, tasks: false });
					}}
				>
					<img src={closeIcon} alt='close' />
				</Button>
				{settingMode ? (
					<div className='min-h-[556px] w-full'>
						<div
							className='w-20 opacity-50 flex items-center cursor-pointer hover:opacity-100 duration-200 ease-out'
							onClick={() => setSettingMode(false)}
						>
							<img src={arrowLeftIcon} alt='arrow' className='w-[14px] h-[14px]' />
							<span className='mx-2 text-base'>Back</span>
						</div>
						<div className='flex my-8'>
							<div className='w-1/2'>
								<h5 className='font-semibold'>Pomodoro</h5>
								<div className='my-4 w-[140px] h-[50px] rounded-lg bg-bg-200 flex items-center justify-center'>
									<img
										src={minusIcon}
										alt='minus'
										className='h-full w-1/3 p-4 duration-200 ease-in-out hover:bg-primary rounded-l-lg cursor-pointer'
										onClick={() => {
											setInitSessionTime(initSessionTime - 1);
											setSessionTime((initSessionTime - 1) * 60);
										}}
									/>
									<input
										type='number'
										min={1}
										value={initSessionTime}
										onChange={(e) => setInitSessionTime(e.current.value)}
										className='w-1/3 h-full bg-bg-200 text-center'
									/>
									<img
										src={plusIcon}
										alt='plus'
										className='h-full w-1/3 p-4 duration-200 ease-in-out hover:bg-primary rounded-r-lg cursor-pointer'
										onClick={() => {
											setInitSessionTime(initSessionTime + 1);
											setSessionTime((initSessionTime + 1) * 60);
										}}
									/>
								</div>
							</div>
							<div className='w-1/2'>
								<h5 className='font-semibold'>Break</h5>
								<div className='my-4 w-[140px] h-[50px] rounded-lg bg-bg-200 flex items-center justify-center'>
									<img
										src={minusIcon}
										alt='minus'
										className='h-full w-1/3 p-4 duration-200 ease-in-out hover:bg-primary rounded-l-lg cursor-pointer'
										onClick={() => {
											setInitBreakTime(initBreakTime - 1);
											setBreakTime((initBreakTime - 1) * 60);
										}}
									/>
									<input
										type='number'
										min={1}
										value={initBreakTime}
										onChange={(e) => setInitBreakTime(e.current.value)}
										className='w-1/3 h-full bg-bg-200 text-center'
									/>
									<img
										src={plusIcon}
										alt='plus'
										className='h-full w-1/3 p-4 duration-200 ease-in-out hover:bg-primary rounded-r-lg cursor-pointer'
										onClick={() => {
											setInitBreakTime(initBreakTime + 1);
											setBreakTime((initBreakTime + 1) * 60);
										}}
									/>
								</div>
							</div>
						</div>
						<div className='flex'>
							<div className='w-1/2'>
								<h5 className='font-semibold'>Play alarm?</h5>
								<Switch
									className='mx-4 mt-2'
									onChange={() => setAlarmOn(!alarmOn)}
									checked={alarmOn}
									uncheckedIcon={false}
									checkedIcon={false}
									handleDiameter={26}
									onHandleColor='#fff'
									offHandleColor='#fff'
									offColor='#14141d'
									onColor='#f3a952'
									height={30}
									width={56}
									activeBoxShadow='0px 0px 0px 0px transparent'
								/>
							</div>
							<div className='w-1/2'>
								<h5 className='font-semibold'>Alarm Sound</h5>
								<Listbox value={selected} onChange={setSelected}>
									<div className='relative mt-2'>
										<Listbox.Button className='relative w-full py-2 pl-3 pr-10 text-left bg-transparent-w-20 rounded-lg shadow-md cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-1 focus-visible:border-indigo-500 sm:text-sm'>
											<span className='block truncate'>{selected.name}</span>
											<span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'></span>
										</Listbox.Button>
										<Transition
											as={Fragment}
											leave='transition ease-in duration-100'
											leaveFrom='opacity-100'
											leaveTo='opacity-0'
										>
											<Listbox.Options className='absolute w-full py-1 mt-1 overflow-auto text-base bg-transparent-w-20 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
												{alarmList.map((alarm, idx) => (
													<Listbox.Option
														key={idx}
														className={({ active }) =>
															`${active ? ' bg-[rgba(243,169,82,0.33)] rounded-md ' : ''}
                          cursor-pointer duration-200 ease-in-out select-none relative mx-1`
														}
														value={alarm}
													>
														{({ selected }) => (
															<>
																<span
																	className={`${
																		selected ? 'font-semibold bg-primary rounded-md' : 'font-normal'
																	} block truncate my-1 py-1 px-4`}
																>
																	{alarm.name}
																</span>
															</>
														)}
													</Listbox.Option>
												))}
											</Listbox.Options>
										</Transition>
									</div>
								</Listbox>
							</div>
						</div>
					</div>
				) : (
					<>
						<div className='relative handle w-full'>
							<h3 className='text-3xl font-bold cursor-move'>Timer & Tasks</h3>
							<img
								src={titleDrawIcon}
								alt='title-draw'
								className='absolute -bottom-3 left-0 w-[220px]'
							/>
						</div>
						<div className='h-[500px] mt-5 w-full overflow-y-auto'>
							<div>
								<div className='w-full mb-5 p-2 flex items-center bg-bg-200 rounded-full'>
									<div
										className={`w-1/2 text-sm font-medium py-1.5 px-6 rounded-full text-center cursor-pointer ${
											!isBreak ? 'bg-primary text-black' : 'text-gray-500'
										}`}
										onClick={() => {
											setIsBreak(false);
											setSessionTime(initSessionTime * 60);
										}}
									>
										Pomodoro
									</div>
									<div
										className={`w-1/2 text-sm font-medium py-1.5 px-6 rounded-full text-center cursor-pointer ${
											isBreak ? 'bg-primary text-black' : 'text-gray-500'
										}`}
										onClick={() => {
											setIsBreak(true);
											setSessionTime(initBreakTime * 60);
										}}
									>
										Break
									</div>
								</div>
								<div className='mb-4 w-full'>
									<div className='py-5 w-full flex flex-col items-center bg-bg-200 rounded-lg cursor-default'>
										<h4 className='text-5xl font-bold'>
											{isBreak &&
												`${
													Math.floor(breakTime / 60) < 10
														? '0' + Math.floor(breakTime / 60)
														: Math.floor(breakTime / 60)
												}:${breakTime % 60 < 10 ? '0' + (breakTime % 60) : breakTime % 60}`}
											{!isBreak &&
												`${
													Math.floor(sessionTime / 60) < 10
														? '0' + Math.floor(sessionTime / 60)
														: Math.floor(sessionTime / 60)
												}:${sessionTime % 60 < 10 ? '0' + (sessionTime % 60) : sessionTime % 60}`}
										</h4>
										<p className='text-white opacity-50 text-xl font-semibold'>{sessionName}</p>
										<div className='my-4 flex justify-center items-center'>
											<Button
												className='min-w-[100px] py-1 px-8 bg-primary text-black font-semibold rounded-full'
												onClick={isTimerPlaying ? stopSessionTimer : startSessionTimer}
											>
												{isTimerPlaying ? 'Stop' : 'Start'}
											</Button>

											<Button onClick={skipTimer} className='mx-4'>
												<img src={skipIcon} alt='skip' className='w-9 h-[30px] invert' />
											</Button>
										</div>

										<Button
											className={`w-[120px] py-[3px] px-3 border border-[#5b5a67] text-sm rounded-full ${
												isTimerPlaying ? 'invisible opacity-0' : 'visible opacity-100'
											}`}
										>
											End session
										</Button>
									</div>
								</div>
							</div>

							<div className='w-full mb-3 flex justify-between items-center'>
								<div className='text-xl font-bold'>Tasks</div>
								<Button
									className='mx-1 border border-gray-900 rounded-full'
									onClick={() => setSettingMode(true)}
								>
									<img src={settingIcon} alt='setting' className='w-9 h-9' />
								</Button>
							</div>

							<div className='w-full py-3 flex flex-col justify-center items-center bg-bg-200 rounded-lg'>
								{taskList.length === 0 ? (
									<img src={emptyIcon} alt='empty' />
								) : (
									<ul className='w-full'>
										{taskList.map((task, i) => (
											<li key={i} className='my-2 px-4 flex items-center'>
												<input type='checkbox' />
												<input
													type='text'
													defaultValue={task}
													onBlur={(e) => updateTask(e, i)}
													className='flex-grow py-1 px-4 bg-bg-200 text-sm'
												/>
												{currentTask === i && <img src={currentIcon} alt='' />}
												<Button>
													<img src={threeDotsIcon} alt='menu' className='w-[22px] h-[22px]' />
												</Button>
												<div>
													<Button
														className='flex items-center text-sm'
														onClick={() => deleteTask(i)}
													>
														<img src={binIcon} alt='bin' className='w-9 h-9 mr-2' />
														Delete Task
													</Button>
													{currentTask === i ? (
														<Button
															className='flex items-center text-sm'
															onClick={() => setCurrentTask(-1)}
														>
															<img src={closeIcon} alt='unset' className='w-9 h-[22px] mr-2' />
															Unset as current
														</Button>
													) : (
														<Button
															className='flex items-center text-sm'
															onClick={() => setCurrentTask(i)}
														>
															<img src={currentIcon} alt='set' className='w-9 h-[22px] mr-2' />
															Set as current
														</Button>
													)}
												</div>
											</li>
										))}
									</ul>
								)}
							</div>

							<div className='mt-4'>
								{isAddingTask ? (
									<div className='w-full flex items-center'>
										<input
											onKeyDown={addNewTask}
											ref={newTaskRef}
											type='text'
											placeholder='New Task name (enter to save)'
											className='py-1 px-4 flex-grow bg-bg-200 rounded-md bg-[rgba(0, 0, 0, 0.267)]'
										/>
										<Button className='mx-4' onClick={() => setIsAddingTask(false)}>
											<img src={closeIcon} alt='cancel' />
										</Button>
									</div>
								) : (
									<Button
										className='min-w-[120px] m-auto border border-primary flex justify-center items-center py-1 px-4 bg-[rgba(243,169,82,.1)] font-medium text-base text-primary rounded-full'
										onClick={() => setIsAddingTask(true)}
									>
										Add Task
									</Button>
								)}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
