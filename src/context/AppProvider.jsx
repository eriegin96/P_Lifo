import React, { createContext, useContext, useRef, useState } from 'react';
import { AuthContext } from './AuthProvider';

import { BACKGROUND_LINKS_LIST, CHILL_LINKS } from '../constants';

export const AppContext = createContext();

export default function AppProvider({ children }) {
	const { user } = useContext(AuthContext);
	const [theme, setTheme] = useState();
	const [fullscreen, setFullscreen] = useState(false);
	const [modalType, setModalType] = useState();
	const initialDraggableModalType = { session: false, tasks: false, notes: false, history: false };
	const [draggableModalType, setDraggableModalType] = useState(initialDraggableModalType);

	// Main Song
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSong, setCurrentSong] = useState(() => {
		const randomIndex = Math.floor(Math.random() * CHILL_LINKS.length);
		return {
			list: CHILL_LINKS,
			index: randomIndex,
			link: CHILL_LINKS[randomIndex],
		};
	});

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

	const mainSongRef = useRef();
	const noisesRefs = useRef([]);

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
		currentSong,
		setCurrentSong,
		isPlaying,
		setIsPlaying,
		background,
		setBackground,
		mainSongRef,
		noisesRefs,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
