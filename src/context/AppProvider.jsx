import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from './AuthProvider';

import { ALARM_LINKS, CHILL_LINKS, JAZZY_LINKS, SLEEPY_LINKS } from '../constants';
import { useHistory } from '../hooks/useFirestore';
import { updateUser } from '../firebase/services';

export const AppContext = createContext();

export default function AppProvider({ children }) {
	const { user } = useContext(AuthContext);
	const [fullscreen, setFullscreen] = useState(false);
	const [modalType, setModalType] = useState();
	const initialDraggableModalType = { session: false, tasks: false, notes: false, history: false };
	const [draggableModalType, setDraggableModalType] = useState(initialDraggableModalType);

	// Templates
	const templates = user?.templates;

	// Background
	const background = user?.background;

	// Main Song
	const alarmOn = user?.alarm?.isOn;
	const alarmLink = user?.alarm?.link;
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSong, setCurrentSong] = useState(() => {
		let randomIndex, currentSong;

		switch (background?.mood) {
			case 'sleepy':
				randomIndex = Math.floor(Math.random() * SLEEPY_LINKS.length);
				currentSong = { list: SLEEPY_LINKS, index: randomIndex, link: SLEEPY_LINKS[randomIndex] };
				break;
			case 'jazzy':
				randomIndex = Math.floor(Math.random() * JAZZY_LINKS.length);
				currentSong = { list: JAZZY_LINKS, index: randomIndex, link: JAZZY_LINKS[randomIndex] };
			case 'chill':
				randomIndex = Math.floor(Math.random() * CHILL_LINKS.length);
				currentSong = { list: CHILL_LINKS, index: randomIndex, link: CHILL_LINKS[randomIndex] };
			default:
				break;
		}

		return currentSong;
	});
	const mainSongRef = useRef();
	const noisesRef = useRef([]);
	const alarmRef = useRef();

	// Session & Task
	const currentSession = user?.currentSession;
	const sessionList = user?.uid ? useHistory(user.uid, 'sessions') : [];
	const [isBreak, setIsBreak] = useState(false);
	const [isPomodoroTimePlaying, setIsPomodoroTimePlaying] = useState(false);
	const [isBreakTimePlaying, setIsBreakTimePlaying] = useState(false);
	const timer = user?.timer;
	const initPomodoroTime = timer?.pomodoroTime;
	const initBreakTime = timer?.breakTime;
	const [pomodoroTime, setPomodoroTime] = useState(initPomodoroTime * 60);
	const [breakTime, setBreakTime] = useState(initBreakTime * 60);
	const [pomodoroInterval, setPomodoroInterval] = useState();
	const [breakInterval, setBreakInterval] = useState();
	useEffect(() => {
		if (isPomodoroTimePlaying) {
			if (pomodoroTime === 0) {
				if (alarmOn) alarmRef.current.play();
				setTimeout(() => alarmRef.current.pause(), 10000);

				setIsBreak(!isBreak);
				setIsPomodoroTimePlaying(false);
				setPomodoroTime(initPomodoroTime * 60);
				updateUser(user.uid, {
					currentSession: {
						...currentSession,
						pomodoroCount: currentSession.pomodoroCount + 1,
						pomodoroTime: currentSession.pomodoroTime + initPomodoroTime * 60 - pomodoroTime,
					},
				});
				return () => clearInterval(pomodoroInterval);
			}

			setPomodoroInterval(
				setInterval(() => {
					setPomodoroTime(pomodoroTime - 1);
				}, 1000)
			);

			return () => {
				clearInterval(pomodoroInterval);
			};
		}
	}, [isPomodoroTimePlaying, pomodoroTime]);
	useEffect(() => {
		if (isBreakTimePlaying) {
			if (breakTime === 0) {
				if (alarmOn) alarmRef.current.play();
				setTimeout(() => alarmRef.current.pause(), 10000);

				setIsBreak(!isBreak);
				setIsBreakTimePlaying(false);
				setBreakTime(initBreakTime * 60);
				updateUser(user.uid, {
					currentSession: {
						...currentSession,
						breakCount: currentSession.breakCount + 1,
						breakTime: currentSession.breakTime + initBreakTime * 60 - breakTime,
					},
				});
				return () => clearInterval(breakInterval);
			}

			setBreakInterval(
				setInterval(() => {
					setBreakTime(breakTime - 1);
				}, 1000)
			);

			return () => {
				clearInterval(breakInterval);
			};
		}
	}, [isBreakTimePlaying, breakTime]);

	// Notes
	const noteList = user?.uid ? useHistory(user.uid, 'notes') : [];

	const value = {
		fullscreen,
		setFullscreen,
		modalType,
		setModalType,
		initialDraggableModalType,
		draggableModalType,
		setDraggableModalType,
		templates,
		alarmOn,
		alarmLink,
		currentSong,
		setCurrentSong,
		isPlaying,
		setIsPlaying,
		background,
		mainSongRef,
		noisesRef,
		alarmRef,
		isBreak,
		setIsBreak,
		isPomodoroTimePlaying,
		setIsPomodoroTimePlaying,
		isBreakTimePlaying,
		setIsBreakTimePlaying,
		currentSession,
		sessionList,
		pomodoroTime,
		setPomodoroTime,
		breakTime,
		timer,
		setBreakTime,
		initPomodoroTime,
		initBreakTime,
		pomodoroInterval,
		setPomodoroInterval,
		breakInterval,
		setBreakInterval,
		noteList,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
