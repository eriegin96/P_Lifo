import React, { createContext, useContext, useRef, useState } from 'react';
import { AuthContext } from './AuthProvider';

import { BACKGROUND_LINKS, CHILL_LINKS } from '../constants';

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
	const [backgroundLinks, setBackgroundLinks] = useState(BACKGROUND_LINKS.chill.scene1);
	const [background, setBackground] = useState({
		set: 'chill',
		scene: 'scene1',
		showTop: true,
		day: true,
		rainy: false,
		top: 'day',
		bot: 'night',
		linkTop: backgroundLinks.day,
		linkBot: backgroundLinks.night,
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
		backgroundLinks,
		setBackgroundLinks,
		background,
		setBackground,
		mainSongRef,
		noisesRefs,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
