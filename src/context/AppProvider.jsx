import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from './AuthProvider';

import { ALARM_LINKS, BACKGROUND_LINKS_LIST, CHILL_LINKS } from '../constants';

export const AppContext = createContext();

export default function AppProvider({ children }) {
	// const { user } = useContext(AuthContext);
	const [theme, setTheme] = useState();
	const [fullscreen, setFullscreen] = useState(false);
	const [modalType, setModalType] = useState();
	const initialDraggableModalType = { session: false, tasks: false, notes: false, history: false };
	const [draggableModalType, setDraggableModalType] = useState(initialDraggableModalType);

	// Main Song
	const [isPlaying, setIsPlaying] = useState(false);
	const [alarmOn, setAlarmOn] = useState(JSON.parse(localStorage.getItem('alarm'))?.isOn ?? true);
	const [alarmList, setAlarmList] = useState(ALARM_LINKS);
	const [alarmLink, setAlarmLink] = useState(
		JSON.parse(localStorage.getItem('alarm'))?.link ?? ALARM_LINKS[0].link
	);
	const [currentSong, setCurrentSong] = useState(() => {
		const randomIndex = Math.floor(Math.random() * CHILL_LINKS.length);
		return {
			list: CHILL_LINKS,
			index: randomIndex,
			link: CHILL_LINKS[randomIndex],
		};
	});
	const mainSongRef = useRef();
	const noisesRefs = useRef([]);
	const alarmRef = useRef();
	useEffect(() => {
		localStorage.setItem('alarm', JSON.stringify({ isOn: alarmOn ?? true, link: alarmLink }));
	}, [alarmOn, alarmLink]);

	// Background
	const [background, setBackground] = useState({
		set: 'chill',
		scene: 'scene1',
		show1: true,
		day: true,
		rainy: false,
		link1: BACKGROUND_LINKS_LIST.find(
			(item) =>
				item.set === 'chill' && item.scene === 'scene1' && item.day === true && item.rainy === false
		).link,
		link2: '',
	});

	// Session & Task
	const [sessionName, setSessionName] = useState(localStorage.getItem('session-name') || '');
	const [isBreak, setIsBreak] = useState(false);
	const [isTimerPlaying, setIsTimerPlaying] = useState(false);
	const [initSessionTime, setInitSessionTime] = useState(25);
	const [initBreakTime, setInitBreakTime] = useState(5);
	const [sessionTime, setSessionTime] = useState(initSessionTime * 60);
	const [breakTime, setBreakTime] = useState(initBreakTime * 60);
	const [sessionInterval, setSessionInterval] = useState();
	useEffect(() => {
		if (isTimerPlaying) {
			if (sessionTime === 0) {
				setIsTimerPlaying(false);
			}

			setSessionInterval(
				setInterval(() => {
					setSessionTime(sessionTime - 1);
				}, 1000)
			);

			return () => {
				clearInterval(sessionInterval);
			};
		}
	}, [isTimerPlaying, sessionTime]);
	useEffect(() => {
		if (isTimerPlaying) {
			if (breakTime === 0) {
				setIsTimerPlaying(false);
			}

			setSessionInterval(
				setInterval(() => {
					setBreakTime(breakTime - 1);
				}, 1000)
			);

			return () => {
				clearInterval(sessionInterval);
			};
		}
	}, [isTimerPlaying, breakTime]);

	const value = {
		theme,
		setTheme,
		fullscreen,
		setFullscreen,
		modalType,
		setModalType,
		initialDraggableModalType,
		draggableModalType,
		setDraggableModalType,
		alarmOn,
		setAlarmOn,
		currentSong,
		setCurrentSong,
		isPlaying,
		setIsPlaying,
		background,
		setBackground,
		mainSongRef,
		noisesRefs,
		alarmRef,
		alarmList,
		setAlarmList,
		alarmLink,
		setAlarmLink,
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
		setSessionName,
		sessionInterval,
		setSessionInterval,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
