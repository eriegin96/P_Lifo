import React, { createContext, useContext, useRef, useState } from 'react';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

export default function AppProvider({ children }) {
	const { user } = useContext(AuthContext);
	const [theme, setTheme] = useState();
	const [fullscreen, setFullscreen] = useState(false);
	const [modalType, setModalType] = useState();
	const [backgroundNoises, setBackgroundNoises] = useState();

	const mainSoundRef = useRef();
	const noisesRefs = useRef([]);

	const value = {
		theme,
		setTheme,
		fullscreen,
		setFullscreen,
		modalType,
		setModalType,
		backgroundNoises,
		setBackgroundNoises,
		mainSoundRef,
		noisesRefs,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
