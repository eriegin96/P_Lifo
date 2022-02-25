import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from './AuthProvider';

import {
	CHILL_LINKS,
	JAZZY_LINKS,
	SLEEPY_LINKS,
} from '../constants';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useNotes, useSessions } from '../hooks/useFirestore';

export const AppContext = createContext();

export default function AppProvider({ children }) {
	const { user } = useContext(AuthContext);
	const [fullscreen, setFullscreen] = useState(false);
	const [modalType, setModalType] = useState();
	const initialDraggableModalType = { session: false, tasks: false, notes: false, history: false };
	const [draggableModalType, setDraggableModalType] = useState(initialDraggableModalType);

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
	const sessionList = useSessions(user.uid);
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

	// Notes
	const notesRef = useRef([]);
	const noteList = useNotes(user.uid);

	const value = {
		fullscreen,
		setFullscreen,
		modalType,
		setModalType,
		initialDraggableModalType,
		draggableModalType,
		setDraggableModalType,
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
		isTimerPlaying,
		setIsTimerPlaying,
		currentSession,
		sessionList,
		sessionTime,
		setSessionTime,
		breakTime,
		setBreakTime,
		initSessionTime,
		setInitSessionTime,
		initBreakTime,
		setInitBreakTime,
		sessionInterval,
		setSessionInterval,
		notesRef,
		noteList,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
