import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Listbox, Menu, Transition } from '@headlessui/react';
import Switch from 'react-switch';

import { Button } from '..';
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
	taskCheckIcon,
	taskUnCheckIcon,
	threeDotsIcon,
	titleTasksIcon,
} from '../../assets/icons';
import { AuthContext } from '../../context/AuthProvider';
import { AppContext } from '../../context/AppProvider';
import { convertTime } from '../../utils';
import { ALARM_LINKS } from '../../constants';
import { addSession, updateUser } from '../../firebase/services';

export default function Tasks() {
	const {
		user: { uid, alarm },
	} = useContext(AuthContext);
	const {
		alarmOn,
		alarmRef,
		alarmLink,
		setModalType,
		draggableModalType,
		setDraggableModalType,
		isBreak,
		setIsBreak,
		isPomodoroTimePlaying,
		setIsPomodoroTimePlaying,
		isBreakTimePlaying,
		setIsBreakTimePlaying,
		currentSession,
		pomodoroTime,
		setPomodoroTime,
		breakTime,
		setBreakTime,
		timer,
		initPomodoroTime,
		initBreakTime,
		pomodoroInterval,
		breakInterval,
	} = useContext(AppContext);

	const [isAddingTask, setIsAddingTask] = useState(false);
	const [settingMode, setSettingMode] = useState(false);
	const [selected, setSelected] = useState(ALARM_LINKS.find((item) => item.link === alarmLink));
	const [initSelected, setInitSelected] = useState(true);
	const newTaskRef = useRef();

	useEffect(() => {
		initSelected
			? setInitSelected(false)
			: updateUser(uid, { alarm: { ...alarm, link: selected.link } }).then(() => {
					alarmRef.current.load();
					alarmRef.current.play();

					const timeout = setTimeout(() => alarmRef.current.pause(), 5000);
					return () => clearTimeout(timeout);
			  });
	}, [selected]);

	const startSessionTimer = () => {
		isBreak ? setIsBreakTimePlaying(true) : setIsPomodoroTimePlaying(true);
		alarmRef.current.load();
	};

	const stopSessionTimer = () => {
		if (isBreak) {
			clearInterval(breakInterval);
			setIsBreakTimePlaying(false);
		} else {
			clearInterval(pomodoroInterval);
			setIsPomodoroTimePlaying(false);
		}
	};

	const skipTimer = () => {
		setIsBreak(!isBreak);

		if (isBreak) {
			setIsBreakTimePlaying(false);
			clearInterval(breakInterval);
			setBreakTime(initBreakTime * 60);
			updateUser(uid, {
				currentSession: {
					...currentSession,
					breakCount: currentSession.breakCount + 1,
					breakTime: currentSession.breakTime + initBreakTime * 60 - breakTime,
				},
			});
		} else {
			setIsPomodoroTimePlaying(false);
			clearInterval(pomodoroInterval);
			setPomodoroTime(initPomodoroTime * 60);
			updateUser(uid, {
				currentSession: {
					...currentSession,
					pomodoroCount: currentSession.pomodoroCount + 1,
					pomodoroTime: currentSession.pomodoroTime + initPomodoroTime * 60 - pomodoroTime,
				},
			});
		}
	};

	const unsetCurrentTask = () => {
		const newTaskList = currentSession.taskList.map((task) => ({ ...task, current: false }));

		updateUser(uid, { currentSession: { ...currentSession, taskList: newTaskList } });
	};

	const setCurrentTask = (i) => {
		const newTaskList = currentSession.taskList.map((task) => ({ ...task, current: false }));
		newTaskList[i] = { ...newTaskList[i], current: true };

		updateUser(uid, { currentSession: { ...currentSession, taskList: newTaskList } });
	};

	const checkTask = (i) => {
		const newTaskList = [...currentSession.taskList];
		newTaskList[i] = { ...newTaskList[i], done: !newTaskList[i].done };

		updateUser(uid, { currentSession: { ...currentSession, taskList: newTaskList } });
	};

	const updateTask = (e, i) => {
		const newTaskList = [...currentSession.taskList];
		newTaskList[i] = { ...newTaskList[i], done: false, content: e.target.value };

		updateUser(uid, { currentSession: { ...currentSession, taskList: newTaskList } });
	};

	const deleteTask = (i) => {
		const newTaskList = [...currentSession.taskList];
		newTaskList.splice(i, 1);

		updateUser(uid, { currentSession: { ...currentSession, taskList: newTaskList } });
	};

	const addNewTask = (e) => {
		if (e.key === 'Enter' && newTaskRef.current?.value) {
			const newTaskList = [
				...currentSession.taskList,
				{ done: false, content: newTaskRef.current.value },
			];

			updateUser(uid, { currentSession: { ...currentSession, taskList: newTaskList } });
			setIsAddingTask(false);
			newTaskRef.current.value = '';
		}
	};

	const handleEndSession = () => {
		const completedTasks = currentSession.taskList
			.filter((task) => task.done === true)
			.map((task) => task.content);
		const uncompletedTasks = currentSession.taskList
			.filter((task) => task.done === false)
			.map((task) => task.content);

		updateUser(uid, {
			currentSession: { ...currentSession, completedTasks, uncompletedTasks },
		}).then(() => setModalType('end-session'));
		addSession(uid, {
			name: currentSession.name,
			time: currentSession.pomodoroTime + currentSession.breakTime + 1000,
			completedTasks,
			uncompletedTasks,
		});
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
											updateUser(uid, { timer: { ...timer, pomodoroTime: initPomodoroTime - 1 } });
											setPomodoroTime((initPomodoroTime - 1) * 60);
										}}
									/>
									<input
										type='number'
										min={1}
										value={initPomodoroTime}
										onChange={(e) =>
											updateUser(uid, { timer: { ...timer, pomodoroTime: e.target.value } })
										}
										className='w-1/3 h-full bg-bg-200 text-center'
									/>
									<img
										src={plusIcon}
										alt='plus'
										className='h-full w-1/3 p-4 duration-200 ease-in-out hover:bg-primary rounded-r-lg cursor-pointer'
										onClick={() => {
											updateUser(uid, { timer: { ...timer, pomodoroTime: initPomodoroTime + 1 } });
											setPomodoroTime((initPomodoroTime + 1) * 60);
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
											updateUser(uid, { timer: { ...timer, breakTime: initBreakTime - 1 } });
											setBreakTime((initBreakTime - 1) * 60);
										}}
									/>
									<input
										type='number'
										min={1}
										value={initBreakTime}
										onChange={(e) =>
											updateUser(uid, { timer: { ...timer, breakTime: e.target.value } })
										}
										className='w-1/3 h-full bg-bg-200 text-center'
									/>
									<img
										src={plusIcon}
										alt='plus'
										className='h-full w-1/3 p-4 duration-200 ease-in-out hover:bg-primary rounded-r-lg cursor-pointer'
										onClick={() => {
											updateUser(uid, { timer: { ...timer, breakTime: initBreakTime + 1 } });
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
									onChange={() => {
										alarmRef.current.pause();
										updateUser(uid, { alarm: { ...alarm, isOn: !alarmOn } });
									}}
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
												{ALARM_LINKS.map((alarm, idx) => (
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
						<div className='relative handle w-5/6 self-start'>
							<h3 className='text-3xl font-bold cursor-move'>Timer & Tasks</h3>
							<img
								src={titleTasksIcon}
								alt='title-draw'
								className='absolute -bottom-3 left-0 w-[220px]'
							/>
						</div>
						<div className='max-h-[500px] mt-5 w-full overflow-y-auto'>
							<div>
								<div className='w-full mb-5 p-2 flex items-center bg-bg-200 rounded-full'>
									<div
										className={`w-1/2 text-sm font-medium py-1.5 px-6 rounded-full text-center cursor-pointer ${
											!isBreak ? 'bg-primary text-black' : 'text-gray-500'
										}`}
										onClick={() => setIsBreak(false)}
									>
										Pomodoro
									</div>
									<div
										className={`w-1/2 text-sm font-medium py-1.5 px-6 rounded-full text-center cursor-pointer ${
											isBreak ? 'bg-primary text-black' : 'text-gray-500'
										}`}
										onClick={() => setIsBreak(true)}
									>
										Break
									</div>
								</div>
								<div className='mb-4 w-full'>
									<div className='py-5 w-full flex flex-col items-center bg-bg-200 rounded-lg cursor-default'>
										<h4 className='text-5xl font-bold'>
											{isBreak ? convertTime(breakTime) : convertTime(pomodoroTime)}
										</h4>
										<p className='text-white opacity-50 text-xl font-semibold'>
											{currentSession.name}
										</p>
										<div className='my-4 flex justify-center items-center'>
											{((isPomodoroTimePlaying && !isBreak) || (isBreakTimePlaying && isBreak)) && (
												<Button
													className='min-w-[100px] py-1 px-8 bg-primary text-black font-semibold rounded-full'
													onClick={stopSessionTimer}
												>
													Stop
												</Button>
											)}

											{((!isPomodoroTimePlaying && initBreakTime * 60 === breakTime && !isBreak) ||
												(!isBreakTimePlaying &&
													initPomodoroTime * 60 === pomodoroTime &&
													isBreak)) && (
												<Button
													className='min-w-[100px] py-1 px-8 bg-primary text-black font-semibold rounded-full'
													onClick={startSessionTimer}
												>
													Start
												</Button>
											)}

											{((initBreakTime * 60 === breakTime && !isBreak) ||
												(initPomodoroTime * 60 === pomodoroTime && isBreak)) && (
												<Button onClick={skipTimer} className='mx-4'>
													<img src={skipIcon} alt='skip' className='w-9 h-[30px] invert' />
												</Button>
											)}

											{initBreakTime * 60 > breakTime && !isBreak && <p>You are in Break time</p>}
											{initPomodoroTime * 60 > pomodoroTime && isBreak && (
												<p>You are in Pomodoro time</p>
											)}
										</div>

										<Button
											className={`w-[120px] py-[3px] px-3 border border-[#5b5a67] text-sm rounded-full ${
												isPomodoroTimePlaying || isBreakTimePlaying
													? 'invisible opacity-0'
													: 'visible opacity-100'
											}`}
											onClick={handleEndSession}
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
								{currentSession.taskList.length === 0 ? (
									<img src={emptyIcon} alt='empty' />
								) : (
									<ul className='w-full'>
										{currentSession.taskList.map((task, i) => (
											<li key={i} className='my-2 px-4 flex items-center'>
												<Button onClick={() => checkTask(i)}>
													<img
														src={task.done ? taskCheckIcon : taskUnCheckIcon}
														alt='checkbox'
														className='w-5 h-5'
													/>
												</Button>
												<input
													type='text'
													defaultValue={task.content}
													onBlur={(e) => updateTask(e, i)}
													className='grow py-1 px-4 bg-bg-200 text-sm'
												/>
												{task.current && (
													<img src={currentIcon} alt='current' className='mr-2 h-5 self-end' />
												)}
												<Menu as='div' className='relative inline-block items-center'>
													<Menu.Button className='align-middle'>
														{({ open }) => (
															<div
																className={`${
																	open ? 'bg-transparent-w-20 rounded-md opacity-100' : 'opacity-50'
																} hover:opacity-30 duration-200 ease-out`}
															>
																<img src={threeDotsIcon} alt='menu' className='w-[22px] h-[22px]' />
															</div>
														)}
													</Menu.Button>
													<Transition
														as={Fragment}
														enter='transition ease-out duration-100'
														enterFrom='transform opacity-0 scale-95'
														enterTo='transform opacity-100 scale-100'
														leave='transition ease-in duration-75'
														leaveFrom='transform opacity-100 scale-100'
														leaveTo='transform opacity-0 scale-95'
													>
														<Menu.Items className='absolute right-0 w-[156px] mt-1 origin-top-right bg-transparent-w-20 rounded-lg'>
															<div className='px-1 py-1 '>
																<Menu.Item>
																	{({ active }) => (
																		<button
																			className={`${
																				active ? 'opacity-50' : 'opacity-100'
																			} my-2 flex items-center duration-200 ease-out w-full text-sm`}
																			onClick={() => deleteTask(i)}
																		>
																			<img src={binIcon} alt='bin' className='w-9 h-9 mr-2' />
																			Delete Task
																		</button>
																	)}
																</Menu.Item>
																<Menu.Item>
																	{({ active }) => (
																		<button
																			className={`${
																				active ? 'opacity-50' : 'opacity-100'
																			} my-2 flex items-center duration-200 ease-out w-full text-sm`}
																			onClick={() => {
																				task.current ? unsetCurrentTask() : setCurrentTask(i);
																			}}
																		>
																			{task.current ? (
																				<>
																					<img
																						src={closeIcon}
																						alt='unset'
																						className='w-9 h-[22px] mr-2'
																					/>
																					Unset as current
																				</>
																			) : (
																				<>
																					<img
																						src={currentIcon}
																						alt='set'
																						className='w-9 h-[22px] mr-2'
																					/>
																					Set as current
																				</>
																			)}
																		</button>
																	)}
																</Menu.Item>
															</div>
														</Menu.Items>
													</Transition>
												</Menu>
											</li>
										))}
									</ul>
								)}
							</div>

							<div className='mt-4'>
								{isAddingTask ? (
									<div className='w-full flex items-center'>
										<input
											autoFocus
											onKeyDown={addNewTask}
											ref={newTaskRef}
											type='text'
											placeholder='New Task name (enter to save)'
											className='py-1 px-4 grow bg-bg-200 rounded-md bg-[rgba(0, 0, 0, 0.267)]'
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
