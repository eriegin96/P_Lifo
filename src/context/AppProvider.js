import React, { createContext, useContext, useRef, useState } from 'react';
import { AuthContext } from './AuthProvider';

import { CHILL_LINKS } from '../constants';

export const AppContext = createContext();

export default function AppProvider({ children }) {
	const { user } = useContext(AuthContext);
	const [theme, setTheme] = useState();
	const [fullscreen, setFullscreen] = useState(false);
	const [modalType, setModalType] = useState();

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

	const mainSongRef = useRef();
	const noisesRefs = useRef([]);

	const value = {
		theme,
		setTheme,
		fullscreen,
		setFullscreen,
		modalType,
		setModalType,
		currentSong,
		setCurrentSong,
		isPlaying,
		setIsPlaying,
		mainSongRef,
		noisesRefs,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
