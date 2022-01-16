import React, { createContext, useContext, useState } from 'react';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();

export default function AppProvider({ children }) {
	const { user } = useContext(AuthContext);
	const [theme, setTheme] = useState();
	const [fullscreen, setFullscreen] = useState(false);
	const [modalType, setModalType] = useState();

	const value = { theme, setTheme, fullscreen, setFullscreen, modalType, setModalType };

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
